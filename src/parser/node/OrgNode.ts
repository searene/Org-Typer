import { InlineStyle } from "../../style/InlineStyle";
import OrgNodeType from "./type/OrgNodeType";

export type TextType = "org-mode" | "markdown";

export default interface OrgNode {

    nodeType: OrgNodeType;
    start: number;
    textType: TextType

    /**
     * End position, exclusive
     */
    end: number;

    children: OrgNode[];
    parent: OrgNode | undefined;
    ownInlineStyles: Set<InlineStyle>
    prefix: string;
    suffix: string;
    getStartIndexOfChildren(): number;
    getEndIndexOfChildren(): number;
    addChild(child: OrgNode): void;
    addChildren(children: OrgNode[]): void;
    getInlineStyles(): Set<InlineStyle>;
    isLeaf() : boolean;
}