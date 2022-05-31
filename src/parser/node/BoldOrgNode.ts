import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class BoldOrgNode implements OrgNode {

    type = OrgNodeType.Bold;
    children: OrgNode[];

    constructor(public start: number, public end: number, child: OrgNode | undefined) {
        this.children = child == undefined ? [] : [child];
    }
}