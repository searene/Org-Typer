import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class DocumentOrgNode implements OrgNode {

    type = OrgNodeType.Document;

    constructor(public start: number, public end: number, public children: OrgNode[]) {
        
    }
    getStartIndexOfChildren(): number {
        return this.start;
    }
    getEndIndexOfChildren(): number {
        return this.end;
    }
}