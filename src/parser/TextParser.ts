import BoldTextNode from "./node/BoldTextNode";
import DocumentTextNode from "./node/DocumentTextNode";
import ItalicTextNode from "./node/ItalicTextNode";
import TextNode from "./node/TextNode";
import PlainTextNode from "./node/PlainTextNode";
import UnderscoreTextNode from "./node/UnderscoreTextNode";
import { OffsetRange } from "./OffsetRange";
import { HeaderShallowProcessor } from "./processor/HeaderShallowProcessor";
import { ShallowProcessor } from "./processor/interface/ComponentProcessor";
import {ImageShallowProcessor} from "./processor/ImageShallowProcessor";

export default class TextParser { 

    private static processors: ShallowProcessor[] = [
        new HeaderShallowProcessor(),
        new ImageShallowProcessor(),
    ];

    constructor() {}

    public parse(text: string): TextNode {
        const root = new DocumentTextNode(0, text.length, []);
        this.parseChildren(text, root, 0, text.length);
        return root;
    }

    private parseChildren(text: string, parent: TextNode, start: number, end: number) {
        this.parseInlineChildren(text, parent, start, end);
    }

    private parseInlineChildren(text: string, parent: TextNode, start: number, end: number) {
        let textRange = new OffsetRange();
        let pos = start;
        while (pos < end) {
            const noneTextNode = this.getNonePlainTextNode(text, pos, end);
            if (noneTextNode == undefined) {
                // this is plain text
                textRange.updateEndPos(pos + 1);
                pos++;
            } else {
                if (textRange.isNotEmpty()) {
                    parent.addChild(new PlainTextNode(textRange.start!, textRange.end!));
                    textRange.setEmpty();
                }
                parent.addChild(noneTextNode);
                pos = noneTextNode.end;
            }
        }
        if (textRange.isNotEmpty()) {
            parent.addChild(new PlainTextNode(textRange.start!, textRange.end!));
        }
    }

    private getNonePlainTextNode(text: string, start: number, end: number): TextNode | undefined {
        const c = text[start];
        for (const shallowProcessor of TextParser.processors) {
            const textNode = shallowProcessor.process(text, start, end);
            if (textNode != undefined) {
                if (textNode.canHaveChildren) {
                    this.parseInlineChildren(text, textNode, textNode.getStartIndexOfChildren(), textNode.getEndIndexOfChildren());
                }
                return textNode;
            }
        }
        if (c == '*') {
            const endOfAsterisk = this.getPosOfCharInCurrentLine('*', text, start + 1, end);
            if (endOfAsterisk != undefined) {
                const boldTextNode = new BoldTextNode(start, endOfAsterisk + 1);
                this.parseInlineChildren(text, boldTextNode, start + 1, endOfAsterisk);
                return boldTextNode;
            }
        } else if (c == '/') {
            const endOfSlash = this.getPosOfCharInCurrentLine('/', text, start + 1, end);
            if (endOfSlash != undefined) {
                const italicTextNode = new ItalicTextNode(start, endOfSlash + 1);
                this.parseInlineChildren(text, italicTextNode, start + 1, endOfSlash);
                return italicTextNode;
            }
        } else if (c == '_') {
            const endOfUnderscore = this.getPosOfCharInCurrentLine('_', text, start + 1, end);
            if (endOfUnderscore != undefined) {
                const underscoreTextNode = new UnderscoreTextNode(start, endOfUnderscore + 1);
                this.parseInlineChildren(text, underscoreTextNode, start + 1, endOfUnderscore);
                return underscoreTextNode;
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

