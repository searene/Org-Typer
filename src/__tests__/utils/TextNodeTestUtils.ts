import { expect } from "vitest";
import TextNode from "../../parser/node/TextNode";

export class TextNodeTestUtils {

    static isEqualWithoutCheckingParent(orgNode1: TextNode, orgNode2: TextNode) {
        TextNodeTestUtils.removeParent(orgNode1);
        TextNodeTestUtils.removeParent(orgNode2);
        expect(orgNode1).toEqual(orgNode2);
    }

    private static removeParent(orgNode: TextNode) {
        delete orgNode.parent;
        for (const child of orgNode.children) {
            TextNodeTestUtils.removeParent(child);
        }
    }
}