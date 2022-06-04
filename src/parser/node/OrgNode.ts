import OrgNodeType from "./type/OrgNodeType";

export default interface OrgNode {

    type: OrgNodeType;
    start: number;

    /**
     * End position, exclusive
     */
    end: number;

    children: OrgNode[];
    parent: OrgNode | undefined;
    ownInlineStyles: Map<string, string>;
    prefix: string;
    suffix: string;
    getStartIndexOfChildren(): number;
    getEndIndexOfChildren(): number;
    addChild(child: OrgNode): void;
    addChildren(children: OrgNode[]): void;
    getInlineStyles(): Map<string, string>;
    isLeaf() : boolean;
}