import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class HeaderTextNode extends AbstractTextNode {

    nodeType = TextNodeType.Header;
    parent: TextNode | undefined = undefined;

    constructor(public start: number, public end: number, public level: number, private whitespaceCount: number, public children: TextNode[] = []) {
        super();
        for (const child of children) {
            child.parent = this;
        }
    }

    getStartIndexOfChildren(): number {
        return this.start + this.level + this.whitespaceCount;
    }
    getEndIndexOfChildren(): number {
        return this.end;
    }
}