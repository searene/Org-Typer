import { Range } from "slate";
import OrgNodeType from "../parser/node/type/OrgNodeType";
import { InlineStyle } from "../style/InlineStyle";

export type CustomRange = Range & {
    type: OrgNodeType;
    inlineStyles: Map<string, string>;
}