import BoldOrgNode from "./node/BoldOrgNode";
import DocumentOrgNode from "./node/DocumentOrgNode";
import ItalicOrgNode from "./node/ItalicOrgNode";
import OrgNode from "./node/OrgNode";
import TextOrgNode from "./node/TextOrgNode";
import UnderscoreOrgNode from "./node/UnderscoreOrgNode";
import { TextRange } from "./TextRange";

export default class OrgParser { 

    constructor() {}

    public parse(text: string): OrgNode {
        const root = new DocumentOrgNode(0, text.length, []);
        this.parseChildren(text, root, 0, text.length);
        return root;
    }

    private parseChildren(text: string, parent: OrgNode, start: number, end: number) {
        this.parseInlineChildren(text, parent, start, end);
    }

    private parseInlineChildren(text: string, parent: OrgNode, start: number, end: number) {
        let textRange = new TextRange();
        let pos = start;
        while (pos < end) {
            const noneTextOrgNode = this.getNoneTextOrgNode(text, pos, end);
            if (noneTextOrgNode == undefined) {
                // this is plain text
                textRange.update(pos + 1);
                pos++;
            } else {
                if (textRange.isNotEmpty()) {
                    parent.addChild(new TextOrgNode(textRange.start!, textRange.end!));
                    textRange.setEmpty();
                }
                parent.addChild(noneTextOrgNode);
                pos = noneTextOrgNode.end;
            }
        }
        if (textRange.isNotEmpty()) {
            parent.addChild(new TextOrgNode(textRange.start!, textRange.end!));
        }
    }

    private getNoneTextOrgNode(text: string, start: number, end: number): OrgNode | undefined {
        const c = text[start];
        if (c == '*') {
            const endOfAsterisk = this.getPosOfCharInCurrentLine('*', text, start + 1, end);
            if (endOfAsterisk != undefined) {
                const boldOrgNode = new BoldOrgNode(start, endOfAsterisk + 1);
                this.parseInlineChildren(text, boldOrgNode, start + 1, endOfAsterisk);
                return boldOrgNode;
            }
        } else if (c == '/') {
            const endOfSlash = this.getPosOfCharInCurrentLine('/', text, start + 1, end);
            if (endOfSlash != undefined) {
                const italicOrgNode = new ItalicOrgNode(start, endOfSlash + 1);
                this.parseInlineChildren(text, italicOrgNode, start + 1, endOfSlash);
                return italicOrgNode;
            }
        } else if (c == '_') {
            const endOfUnderscore = this.getPosOfCharInCurrentLine('_', text, start + 1, end);
            if (endOfUnderscore != undefined) {
                const underscoreOrgNode = new UnderscoreOrgNode(start, endOfUnderscore + 1);
                this.parseInlineChildren(text, underscoreOrgNode, start + 1, endOfUnderscore);
                return underscoreOrgNode;
            }
        }
        return undefined;
    }
    private getPosOfCharInCurrentLine(char: string, text: string, start: number, end: number): number | undefined {
        for (let i = start; i < end; i++) {
            if (text[i] == char) {
                return i;
            }
            if (text[i] == '\n') {
                return undefined;
            }
        }
        return undefined;
    }
}

