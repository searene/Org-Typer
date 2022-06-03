import BoldOrgNode from "./node/BoldOrgNode";
import DocumentOrgNode from "./node/DocumentOrgNode";
import ItalicOrgNode from "./node/ItalicOrgNode";
import OrgNode from "./node/OrgNode";
import TextOrgNode from "./node/TextOrgNode";

enum RuleType {
    Bold,
    Italic,
}

interface Rule {
    ruleType: RuleType,
    orgNodeInitiator: (start: number, end: number) => OrgNode,
    delimiterLen: number,
    pattern: RegExp,
}

export default class OrgParser { 

    private rules: Rule[] = [{
        ruleType: RuleType.Bold,
        orgNodeInitiator: (start, end) => new BoldOrgNode(start, end, undefined),
        delimiterLen: 1,
        pattern: /\*([^\s].*)\*/g,
    }, {
        ruleType: RuleType.Italic,
        orgNodeInitiator: (start, end) => new ItalicOrgNode(start, end, undefined),
        delimiterLen: 1,
        pattern: /\/([^\s].*)\//g,
    }]

    constructor() {}

    public parse(text: string): OrgNode {
        const root = new DocumentOrgNode(0, text.length, []);
        this.parseChildren(text, root, 0, text.length);
        return root;
    }

    private parseChildren(text: string, parent: OrgNode, start: number, end: number) {
        this.parseInlineChildren(text, parent, start, end);
    }

    private parseInlineChildren(text: string, parent: OrgNode, start: number, end: number) {
        for (const rule of this.rules) {
            this.parseInlineChildrenByRule(rule, text, parent, start, end);
        }
        this.fillInPlainTextChildren(text, parent, start, end);
    }

    private fillInPlainTextChildren(text: string, parent: OrgNode, start: number, end: number) {
        const unfilledRanges = this.getUnfilledRanges(parent);
        for (const [start, end] of unfilledRanges) {
            const textNode = new TextOrgNode(start, end);
            parent.children.push(textNode);
        }
        parent.children.sort((a, b) => a.start - b.start);
    }

    private getUnfilledRanges(parent: OrgNode): [number, number][] {
        let pos = parent.getStartIndexOfChildren();
        let childIndex = 0;
        const res: [number, number][] = [];
        while (true) {
            if (childIndex >= parent.children.length) {
                if (pos >= parent.getEndIndexOfChildren()) {
                    return res;
                } else {
                    res.push([pos, parent.getEndIndexOfChildren()]);
                    return res;
                }
            }
            const child = parent.children[childIndex];
            if (pos < child.start) {
                res.push([pos, child.start]);
                pos = child.end;
                childIndex++;
            } else if (pos == child.start) {
                pos = child.end;
                childIndex++;
            } else {
                throw new Error("pos should not be greater than child.start");
            }
        }
    }

    private parseInlineChildrenByRule(rule: Rule, text: string, parent: OrgNode, start: number, end: number) {
        const match = rule.pattern.exec(text);
        if (match == null) {
            return;
        }
        const matchedText = match[0]
        const innerString = match[1]
        const startOfChild = start + match.index;
        const endOfChild = startOfChild + matchedText.length;
        const orgNode = rule.orgNodeInitiator(startOfChild, endOfChild);
        this.parseInlineChildren(innerString, orgNode, startOfChild + rule.delimiterLen, endOfChild - rule.delimiterLen);
        parent.children.push(orgNode);
    }
}

