import { InlineStyle } from "../../style/InlineStyle";
import AbstractTextNode from "./AbstractTextNode";
import TextNode from "./TextNode";
import TextNodeType from "./type/TextNodeType";

export default class HeaderTextNode extends AbstractTextNode {

    ownInlineStyles: Set<InlineStyle> = new Set([InlineStyle.Header]);
    nodeType = TextNodeType.Header;
    parent: TextNode | undefined = undefined;
    canHaveChildren = true

    constructor(public start: number,
                public end: number,
                public level: number,
                private whitespaceCount: number,
                public children: TextNode[] = [],
                public prefix: string,
                public suffix: string) {
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
    getPrefix(): string {
        if (this.textType === "org-mode") {
            return "*".repeat(this.level) + " ".repeat(this.whitespaceCount);
        } else {
            throw new Error("Unknown text type");
        }
    }
    getSuffix(): string {
        return "";
    }
}