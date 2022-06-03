import { Path } from "slate";
import OrgNode from "../parser/node/OrgNode";
import OrgNodeType from "../parser/node/type/OrgNodeType";
import { CustomRange } from "./CustomRange";

export class RangeConverter {

    static convertOrgNodeToRanges(orgNode: OrgNode, path: Path): CustomRange[] {
        if (!orgNode.isLeaf()) {
            return orgNode.children.flatMap(child => RangeConverter.convertOrgNodeToRanges(child, path));
        }
        const inlineStyles = orgNode.getInlineStyles();
        if (orgNode.type == OrgNodeType.Text && inlineStyles.size == 0) {
            return [];
        }
        return [{
            inlineStyles: orgNode.getInlineStyles(),
            anchor: { path, offset: orgNode.start },
            focus: { path, offset: orgNode.end }
        }]
    }
}