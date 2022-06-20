import { InlineStyle } from "../../style/InlineStyle";
import { InlineStyleGenerator } from "../../style/InlineStyleGenerator";
import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class BoldTextNode extends AbstractTextNode {
    ownInlineStyles: Set<InlineStyle> = new Set([InlineStyle.Bold]);
    nodeType = TextNodeType.Bold;
    children: TextNode[] = [];
    parent: TextNode | undefined = undefined;
    canHaveChildren = true

    constructor(public start: number, public end: number, child?: TextNode) {
        super();
        if (child != undefined) {
            this.addChild(child);
        }
    }

    getStartIndexOfChildren(): number {
        return this.start + 1;
    }
    getEndIndexOfChildren(): number {
        return this.end - 1;
    }
    getPrefix(): string {
        if (this.textType === "org-mode") {
            return "*";
        } else {
            throw new Error("Unknown text type");
        }
    }
    getSuffix(): string {
        return this.getPrefix();
    }

}