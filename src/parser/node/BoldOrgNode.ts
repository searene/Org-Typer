import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class BoldOrgNode implements OrgNode {

    type = OrgNodeType.Bold;
    children: OrgNode[];
    leadingCharacters = "*";

    constructor(public start: number, public end: number, child: OrgNode | undefined) {
        this.children = child == undefined ? [] : [child];
    }
    getStartIndexOfChildren(): number {
        return this.start + 1;
    }
    getEndIndexOfChildren(): number {
        return this.end - 1;
    }
}