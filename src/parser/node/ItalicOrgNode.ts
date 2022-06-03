import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class ItalicOrgNode implements OrgNode {

    type = OrgNodeType.Italic;
    children: OrgNode[];

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