import { InlineStyleGenerator } from "../../style/InlineStyleGenerator";
import AbstractOrgNode from "./AbstractOrgNode";
import OrgNode from "./OrgNode";
import OrgNodeType from "./type/OrgNodeType";

export default class ItalicOrgNode extends AbstractOrgNode {

    ownInlineStyles: Map<string, string> = new Map([InlineStyleGenerator.getItalicInlineStyle()])
    type = OrgNodeType.Italic;
    children: OrgNode[] = [];
    parent: OrgNode | undefined = undefined;

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
    getInlineStyle(): Set<InlineStyle> {
        const res: Set<InlineStyle> = new Set();
        this.parent?.getInlineStyle().forEach(s => res.add(s));
        res.add(InlineStyle.Italic);
        return res;
    }
}