import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default class TextOrgNode implements OrgNode {

    type = OrgNodeType.Text;

    children: OrgNode[] = [];

    constructor(public start: number, public end: number, public text: string) {
    }

}