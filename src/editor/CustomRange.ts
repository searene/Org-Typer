import { Range } from "slate";
import OrgNode from "../parser/node/OrgNode";
import OrgNodeType from "../parser/node/type/OrgNodeType";
import { InlineStyle } from "../style/InlineStyle";

export type CustomRange = Range & {
    type: OrgNodeType;
    orgNode: OrgNode;
    inlineStyles: Set<InlineStyle>;
}