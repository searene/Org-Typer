import TextNode from "../../node/TextNode"
import { OffsetRange } from "../../OffsetRange";

export type ProcessedComponent = {
    textNode: TextNode;
    childRange: OffsetRange;
}

/**
 * Try to get a org node, without filling its children (which is why we call it "shallow" processing).
 */
export interface ShallowProcessor {

    process(text: string, startPos: number, endPos: number): TextNode | undefined;
}