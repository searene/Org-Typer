import { expect, describe, it } from 'vitest'
import BoldOrgNode from '../../parser/node/BoldOrgNode';
import DocumentOrgNode from '../../parser/node/DocumentOrgNode';
import TextOrgNode from '../../parser/node/TextOrgNode';
import OrgParser from '../../parser/OrgParser'

describe("Test org parser", () => {

    it("should parse plain texts", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("abc");
        expect(orgNode).toEqual(new DocumentOrgNode(0, 3, [new TextOrgNode(0, 3)]))
    });

    it("should parse bold texts", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("*abc*");
        expect(orgNode).toEqual(new DocumentOrgNode(0, 5, [new BoldOrgNode(0, 5, new TextOrgNode(1, 4))]))
    })

    it("unclosed bold texts should be taken as plain texts", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("*abc");
        expect(orgNode).toEqual(new DocumentOrgNode(0, 4, [new TextOrgNode(0, 4)]))
    })

    it("should parse bold texts along with plain texts", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("123*abc*测试");
        expect(orgNode).toEqual(new DocumentOrgNode(0, 10, [
            new TextOrgNode(0, 3),
            new BoldOrgNode(3, 8, new TextOrgNode(4, 7)),
            new TextOrgNode(8, 10),
        ]))
    })
});