import OrgNode from "./OrgNode";
import OrgNodeType from "./OrgNodeType";

export default abstract class AbstractOrgNode implements OrgNode {

    addChildren(children: OrgNode[]): void {
        for (const child of children) {
            this.addChild(child);
        }
    }

    addChild(child: OrgNode){
        this.children.push(child);
        child.parent = this;
    }

    abstract type: OrgNodeType;
    abstract start: number;
    abstract end: number;
    abstract children: OrgNode[];
    abstract parent: OrgNode | undefined;
    abstract getStartIndexOfChildren(): number;
    abstract getEndIndexOfChildren(): number;
}