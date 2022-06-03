import OrgNode from "../../node/OrgNode"
import { OffsetRange } from "../../OffsetRange";

export type ProcessedComponent = {
    orgNode: OrgNode;
    childRange: OffsetRange;
}

/**
 * Try to get a org node, without filling its children (which is why we call it "shallow" processing).
 */
export interface ShallowProcessor {

    process(text: string, startPos: number, endPos: number): OrgNode | undefined;
}