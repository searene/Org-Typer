import { Path } from "slate";
import OrgNode from "../parser/node/OrgNode";
import OrgNodeType from "../parser/node/type/OrgNodeType";
import { CustomRange } from "./CustomRange";

export class RangeConverter {

    static convertOrgNodeToRanges(orgNode: OrgNode, path: Path): CustomRange[] {
        if (!orgNode.isLeaf()) {
            const childRanges = orgNode.children.flatMap(child => RangeConverter.convertOrgNodeToRanges(child, path));
            const ownRanges = RangeConverter.getOwnRanges(orgNode, path);
            return [...childRanges, ...ownRanges];
        }
        const inlineStyles = orgNode.getInlineStyles();
        if (orgNode.nodeType == OrgNodeType.Text && inlineStyles.size == 0) {
            return [];
        }
        return [RangeConverter.createCustomRange(orgNode, path)];
    }

    private static createCustomRange(orgNode: OrgNode, path: Path): CustomRange {
        return {
            type: orgNode.nodeType,
            inlineStyles: orgNode.getInlineStyles(),
            anchor: { path, offset: orgNode.start },
            focus: { path, offset: orgNode.end }
        };
    }

    private static getOwnRanges(orgNode: OrgNode, path: Path): CustomRange[] {
        const prefixRange = RangeConverter.getPrefixRange(orgNode, path);
        const suffixRange = RangeConverter.getSuffixRange(orgNode, path);
        const res = [];
        if (prefixRange !== undefined) {
            res.push(prefixRange);
        }
        if (suffixRange !== undefined) {
            res.push(suffixRange);
        }
        return res;
    }

    private static getPrefixRange(orgNode: OrgNode, path: Path): CustomRange | undefined {
        return orgNode.prefix === "" ? undefined : RangeConverter.createCustomRange(orgNode, path);
    }

    private static getSuffixRange(orgNode: OrgNode, path: Path): CustomRange | undefined {
        return orgNode.suffix === "" ? undefined : RangeConverter.createCustomRange(orgNode, path);
    }
}