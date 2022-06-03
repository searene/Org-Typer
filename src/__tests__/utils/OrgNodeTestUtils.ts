import { expect } from "vitest";
import OrgNode from "../../parser/node/OrgNode";

export class OrgNodeTestUtils {

    static isEqualWithoutCheckingParent(orgNode1: OrgNode, orgNode2: OrgNode) {
        OrgNodeTestUtils.removeParent(orgNode1);
        OrgNodeTestUtils.removeParent(orgNode2);
        expect(orgNode1).toEqual(orgNode2);
    }

    private static removeParent(orgNode: OrgNode) {
        delete orgNode.parent;
        for (const child of orgNode.children) {
            OrgNodeTestUtils.removeParent(child);
        }
    }
}