import BoldOrgNode from "./node/BoldOrgNode";
import OrgNode from "./node/OrgNode";
import TextOrgNode from "./node/TextOrgNode";

export default class OrgParser { 

    constructor(private readonly text: string) {}

    public parse(): OrgNode[] {
        return this.parseNodes(undefined, this.text, 0);
    }

    private parseNodes(parent: OrgNode | undefined, text: string, startPos: number): OrgNode[] {
        let currentPos = startPos;
        const res = [];
        while (currentPos < text.length) {
            const orgNode = this.getNextOrgNode(parent, text, currentPos)
            if (orgNode == undefined) {
                throw new Error("Org node is empty before reaching the end of the text.");
            }
            res.push(orgNode);
            currentPos = orgNode.end;
        }
        return res;
    }

    private getNextOrgNode(parent: OrgNode | undefined, text: string, startPos: number): OrgNode | undefined {
        let currentPos = startPos;
        while (currentPos < text.length) {
            if(this.isBoldDelimiter(text, currentPos)) {
                const boldNode = this.parseBoldNode(parent, text, startPos);
                currentPos = boldNode.end;
                return boldNode;
            } else {
                const textNode = this.parseTextNode(parent, text, startPos);
                currentPos = textNode.end;
                return textNode;
            }
        }
        return undefined;
    }

    private parseTextNode(parent: OrgNode | undefined, text: string, startPos: number): OrgNode {
        const textNode = new TextOrgNode(startPos, startPos, "");
        let currentPos = startPos;
        while (currentPos < text.length) {
            if (this.isText(text, currentPos)) {
                currentPos++;
            } else {
                break;
            }
        }
        textNode.text = text.substring(startPos, currentPos);
        textNode.end = currentPos;
        parent?.children.push(textNode);
        return textNode;
    }

    private isText(text: string, startPos: number): boolean {
        return !this.isBoldDelimiter(text, startPos);
    }

    private isBoldDelimiter(text: string, startPos: number): boolean {
        return text[startPos] === '*';
    }

    private parseBoldNode(parent: OrgNode | undefined, text: string, startPos: number): OrgNode {

        // end of the bold node
        if (parent != undefined && parent instanceof BoldOrgNode) {
            parent.end = startPos + 1;
            return parent;
        }

        // start of the bold node
        const boldNode = new BoldOrgNode(startPos, startPos + 1, undefined);
        this.parseNodes(boldNode, text, startPos + 1);
        return boldNode;
    }

}

