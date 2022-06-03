import OrgNodeType from "./OrgNodeType";

export default interface OrgNode {

    type: OrgNodeType;
    start: number;

    /**
     * End position, exclusive
     */
    end: number;

    children: OrgNode[];

    parent: OrgNode | undefined;

    getStartIndexOfChildren(): number;

    getEndIndexOfChildren(): number;

    addChild(child: OrgNode): void;

    addChildren(children: OrgNode[]): void;
}