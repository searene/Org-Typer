import { InlineStyle } from "../../style/InlineStyle";
import TextNodeType from "./type/TextNodeType";

export type TextType = "org-mode" | "markdown";

export default interface TextNode {

    nodeType: TextNodeType;
    start: number;
    textType: TextType

    /**
     * End position, exclusive
     */
    end: number;

    hasChildren: boolean

    children: TextNode[];
    parent: TextNode | undefined;
    ownInlineStyles: Set<InlineStyle>
    getStartIndexOfChildren(): number;
    getEndIndexOfChildren(): number;
    addChild(child: TextNode): void;
    addChildren(children: TextNode[]): void;
    getInlineStyles(): Set<InlineStyle>;
    isLeaf() : boolean;

    getPrefix(): string;
    getSuffix(): string;
}