import AbstractOrgNode from "./AbstractOrgNode";
import OrgNode from "./OrgNode";
import OrgNodeType from "./type/OrgNodeType";

export default class TextOrgNode extends AbstractOrgNode {

    nodeType = OrgNodeType.Text;
    children: OrgNode[] = [];
    parent: OrgNode | undefined = undefined;

    constructor(public start: number, public end: number) {
        super();
    }
    getStartIndexOfChildren(): number {
        throw new Error("TextNode doesn't have any child.");
    }
    getEndIndexOfChildren(): number {
        throw new Error("TextNode doesn't have any child.");
    }

}