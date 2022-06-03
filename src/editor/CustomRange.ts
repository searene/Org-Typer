import { Range } from "slate";
import { InlineStyle } from "../style/InlineStyle";

export type CustomRange = Range & {
    inlineStyles: Set<InlineStyle>
}