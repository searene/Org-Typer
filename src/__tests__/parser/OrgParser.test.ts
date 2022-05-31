import { expect, describe, it } from 'vitest'
import BoldOrgNode from '../../parser/node/BoldOrgNode';
import TextOrgNode from '../../parser/node/TextOrgNode';
import OrgParser from '../../parser/OrgParser'

describe("Test org parser", () => {

    it("should parse plain texts", () => {
        const orgParser = new OrgParser("abc");
        const orgNodes = orgParser.parse();
        expect(orgNodes).toEqual([new TextOrgNode(0, 3, "abc")])
    });

    it("should parse bold texts", () => {
        const orgParser = new OrgParser("*abc*");
        const orgNodes = orgParser.parse();
        expect(orgNodes).toEqual([new BoldOrgNode(0, 5, new TextOrgNode(1, 4, "abc"))])
    })
});