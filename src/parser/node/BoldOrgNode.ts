import AbstractOrgNode from "./AbstractOrgNode";
import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class BoldOrgNode extends AbstractOrgNode {

    type = OrgNodeType.Bold;
    children: OrgNode[] = [];
    parent: OrgNode | undefined = undefined;

    constructor(public start: number, public end: number, child?: OrgNode) {
        super();
        if (child != undefined) {
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