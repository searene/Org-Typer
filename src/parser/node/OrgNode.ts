import OrgNodeType from "./OrgNodeType";

export default interface OrgNode {

    type: OrgNodeType;
    start: number;

    /**
     * End position, exclusive
     */
    end: number;

    children: OrgNode[];

    getStartIndexOfChildren(): number;

    getEndIndexOfChildren(): number;
}