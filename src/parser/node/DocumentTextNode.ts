import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class DocumentTextNode extends AbstractTextNode {

    nodeType = TextNodeType.Document;
    parent = undefined;
    hasChildren = true

    constructor(public start: number, public end: number, public children: TextNode[]) {
        super();
        for (const child of children) {
            child.parent = this;
        }
    }
    getStartIndexOfChildren(): number {
        return this.start;
    }
    getEndIndexOfChildren(): number {
        return this.end;
    }
}