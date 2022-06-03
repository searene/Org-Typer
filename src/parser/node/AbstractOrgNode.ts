import { InlineStyle } from "../../style/InlineStyle";
import OrgNode from "./OrgNode";
import OrgNodeType from "./type/OrgNodeType";

export default abstract class AbstractOrgNode implements OrgNode {

    isLeaf(): boolean {
        return this.children.length == 0;
    }

    getInlineStyles(): Set<InlineStyle> {
        if (this.parent == undefined) {
            return new Set();
        }
        return this.parent!.getInlineStyles();
    }

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