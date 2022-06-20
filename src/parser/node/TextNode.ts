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

    /**
     * Can this node have children? Note that this property only denotes that the current node
     * can have children, but it doesn't require the node to have them. In other words, the
     * "children" property can be empty even if "canHaveChildren" is true.
     */
    canHaveChildren: boolean

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