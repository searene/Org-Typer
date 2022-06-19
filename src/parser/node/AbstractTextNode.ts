import { InlineStyle } from "../../style/InlineStyle";
import TextNode, { TextType } from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default abstract class AbstractTextNode implements TextNode {

    ownInlineStyles: Set<InlineStyle> = new Set();
    textType: TextType = 'org-mode';

    isLeaf(): boolean {
        return this.children.length == 0;
    }

    getInlineStyles(): Set<InlineStyle> {
        if (this.parent == undefined) {
            return this.ownInlineStyles;
        }
        return new Set([...this.parent.getInlineStyles(), ...this.ownInlineStyles]);
    }

    addChildren(children: TextNode[]): void {
        for (const child of children) {
            this.addChild(child);
        }
    }

    addChild(child: TextNode){
        this.children.push(child);
        child.parent = this;
    }

    abstract nodeType: TextNodeType;
    abstract hasChildren: boolean;
    abstract start: number;
    abstract end: number;
    abstract children: TextNode[];
    abstract parent: TextNode | undefined;
    abstract getStartIndexOfChildren(): number;
    abstract getEndIndexOfChildren(): number;
    getPrefix() {
        return "";
    }
    getSuffix() {
        return "";
    }
}