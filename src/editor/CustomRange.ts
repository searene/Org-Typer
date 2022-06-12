import { Range } from "slate";
import TextNode from "../parser/node/TextNode";
import TextNodeType from "../parser/node/type/TextNodeType";
import { InlineStyle } from "../style/InlineStyle";

export type CustomRange = Range & {
    type: TextNodeType;
    textNode: TextNode;
    inlineStyles: Set<InlineStyle>;
}