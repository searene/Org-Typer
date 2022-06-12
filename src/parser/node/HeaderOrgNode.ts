import AbstractOrgNode from "./AbstractOrgNode";
import OrgNode from "./OrgNode";
import OrgNodeType from "./type/OrgNodeType";

export default class HeaderOrgNode extends AbstractOrgNode {

    nodeType = OrgNodeType.Header;
    parent: OrgNode | undefined = undefined;

    constructor(public start: number, public end: number, public level: number, private whitespaceCount: number, public children: OrgNode[] = []) {
        super();
        for (const child of children) {
            child.parent = this;
        }
    }

    getStartIndexOfChildren(): number {
        return this.start + this.level + this.whitespaceCount;
    }
    getEndIndexOfChildren(): number {
        return this.end;
    }
}