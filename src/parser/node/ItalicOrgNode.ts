import AbstractOrgNode from "./AbstractOrgNode";
import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class ItalicOrgNode extends AbstractOrgNode {

    type = OrgNodeType.Italic;
    children: OrgNode[] = [];
    parent = undefined;

    constructor(public start: number, public end: number, child?: OrgNode) {
        super();
        if(child != undefined) {
            this.addChild(child);
        }
    }
    getStartIndexOfChildren(): number {
        return this.start + 1;
    }
    getEndIndexOfChildren(): number {
        return this.end - 1;
    }
}