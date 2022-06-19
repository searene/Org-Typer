import { InlineStyle } from "../../style/InlineStyle";
import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class ItalicTextNode extends AbstractTextNode {

    ownInlineStyles: Set<InlineStyle> = new Set([InlineStyle.Italic]);
    nodeType = TextNodeType.Italic;
    children: TextNode[] = [];
    parent: TextNode | undefined = undefined;
    hasChildren = true

    constructor(public start: number, public end: number, child?: TextNode) {
        super();
        if(child != undefined) {
            this.addChild(child);
        }
    }
    getStartIndexOfChildren(): number {
        return this.start + 1;
    }
    getEndIndexOfChildren(): number {
        return this.end - 1;
    }
    getInlineStyle(): Set<InlineStyle> {
        const res: Set<InlineStyle> = new Set();
        this.parent?.getInlineStyles().forEach(s => res.add(s));
        res.add(InlineStyle.Italic);
        return res;
    }
    getPrefix(): string {
        if (this.textType === "org-mode") {
            return "/";
        } else {
            throw new Error("Unknown text type");
        }
    }
    getSuffix(): string {
        return this.getPrefix();
    }

}