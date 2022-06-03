import { expect, describe, it } from 'vitest'
import BoldOrgNode from '../../parser/node/BoldOrgNode';
import DocumentOrgNode from '../../parser/node/DocumentOrgNode';
import HeaderOrgNode from '../../parser/node/HeaderOrgNode';
import ItalicOrgNode from '../../parser/node/ItalicOrgNode';
import TextOrgNode from '../../parser/node/TextOrgNode';
import OrgParser from '../../parser/OrgParser'
import { OrgNodeTestUtils } from '../utils/OrgNodeTestUtils';

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

    it("can parse italic", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("1/abc/");
        expect(orgNode).toEqual(new DocumentOrgNode(0, 6, [
            new TextOrgNode(0, 1),
            new ItalicOrgNode(1, 6, new TextOrgNode(2, 5))]))
    })

    it("can parse bold and italic", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("/*abc*/");
        expect(orgNode).toEqual(new DocumentOrgNode(0, 7, [
            new ItalicOrgNode(0, 7, new BoldOrgNode(1, 6, new TextOrgNode(2, 5)))]))
    })

    it("can parse header", () => {
        const orgParser = new OrgParser();
        const orgNode = orgParser.parse("* My Title");
        const expected = new DocumentOrgNode(0, 10, [
            new HeaderOrgNode(0, 10, 1, 1, [new TextOrgNode(2, 10)])])
        OrgNodeTestUtils.isEqualWithoutCheckingParent(orgNode, expected);
    })
});