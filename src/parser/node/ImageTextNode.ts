import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class ImageTextNode extends AbstractTextNode {
    nodeType: TextNodeType = TextNodeType.Image;
    children: TextNode[] = [];
    parent: TextNode | undefined;

    constructor(public start: number, public end: number, public url: string) {
        super()
    }
    getStartIndexOfChildren(): number {
        throw new Error("Image nodes have no child.");
    }
    getEndIndexOfChildren(): number {
        throw new Error("Image nodes have no child.");
    }

}