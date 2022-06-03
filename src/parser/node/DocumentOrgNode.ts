import AbstractOrgNode from "./AbstractOrgNode";
import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class DocumentOrgNode extends AbstractOrgNode {

    type = OrgNodeType.Document;
    parent = undefined;

    constructor(public start: number, public end: number, public children: OrgNode[]) {
        super();
        for (const child of children) {
            child.parent = this;
        }
    }
    getStartIndexOfChildren(): number {
        return this.start;
    }
    getEndIndexOfChildren(): number {
        return this.end;
    }
}