import { expect, describe, it } from 'vitest'
import TextOrgNode from '../../parser/node/TextOrgNode';
import OrgParser from '../../parser/OrgParser'

describe("Test org parser", () => {

    it("should parse plain texts", () => {
        const orgParser = new OrgParser("abc");
        const orgNodes = orgParser.parse();
        expect(orgNodes).toEqual([new TextOrgNode(0, 3, "abc")])
    })
})