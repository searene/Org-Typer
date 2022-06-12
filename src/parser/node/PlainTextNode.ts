import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class PlainTextNode extends AbstractTextNode {

    nodeType = TextNodeType.Text;
    children: TextNode[] = [];
    parent: TextNode | undefined = undefined;

    constructor(public start: number, public end: number) {
        super();
    }
    getStartIndexOfChildren(): number {
        throw new Error("TextNode doesn't have any child.");
    }
    getEndIndexOfChildren(): number {
        throw new Error("TextNode doesn't have any child.");
    }

}