import { InlineStyle } from "../../style/InlineStyle";
import OrgNode, { TextType } from "./OrgNode";
import OrgNodeType from "./type/OrgNodeType";

export default abstract class AbstractOrgNode implements OrgNode {

    ownInlineStyles: Set<InlineStyle> = new Set();
    prefix = "";
    suffix = "";
    textType: TextType = 'org-mode';

    isLeaf(): boolean {
        return this.children.length == 0;
    }

    getInlineStyles(): Set<InlineStyle> {
        if (this.parent == undefined) {
            return this.ownInlineStyles;
        }
        return new Set([...this.parent.getInlineStyles(), ...this.ownInlineStyles]);
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

    abstract nodeType: OrgNodeType;
    abstract start: number;
    abstract end: number;
    abstract children: OrgNode[];
    abstract parent: OrgNode | undefined;
    abstract getStartIndexOfChildren(): number;
    abstract getEndIndexOfChildren(): number;
}