import { expect, describe, it } from 'vitest'
import BoldTextNode from '../../parser/node/BoldTextNode';
import DocumentTextNode from '../../parser/node/DocumentTextNode';
import HeaderTextNode from '../../parser/node/HeaderTextNode';
import ImageTextNode from '../../parser/node/ImageTextNode';
import ItalicTextNode from '../../parser/node/ItalicTextNode';
import PlainTextNode from '../../parser/node/PlainTextNode';
import TextParser from '../../parser/TextParser'
import { TextNodeTestUtils as TextNodeTestUtils } from '../utils/TextNodeTestUtils';

describe("Test text parser", () => {

    it("should parse plain texts", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("abc");
        expect(orgNode).toEqual(new DocumentTextNode(0, 3, [new PlainTextNode(0, 3)]))
    });

    it("should parse bold texts", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("*abc*");
        expect(orgNode).toEqual(new DocumentTextNode(0, 5, [new BoldTextNode(0, 5, new PlainTextNode(1, 4))]))
    })

    it("unclosed bold texts should be taken as plain texts", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("*abc");
        expect(orgNode).toEqual(new DocumentTextNode(0, 4, [new PlainTextNode(0, 4)]))
    })

    it("should parse bold texts along with plain texts", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("123*abc*测试");
        expect(orgNode).toEqual(new DocumentTextNode(0, 10, [
            new PlainTextNode(0, 3),
            new BoldTextNode(3, 8, new PlainTextNode(4, 7)),
            new PlainTextNode(8, 10),
        ]))
    })

    it("can parse italic", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("1/abc/");
        expect(orgNode).toEqual(new DocumentTextNode(0, 6, [
            new PlainTextNode(0, 1),
            new ItalicTextNode(1, 6, new PlainTextNode(2, 5))]))
    })

    it("can parse bold and italic", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("/*abc*/");
        expect(orgNode).toEqual(new DocumentTextNode(0, 7, [
            new ItalicTextNode(0, 7, new BoldTextNode(1, 6, new PlainTextNode(2, 5)))]))
    })

    it("can parse header", () => {
        const orgParser = new TextParser();
        const orgNode = orgParser.parse("* My Title");
        const expected = new DocumentTextNode(0, 10, [
            new HeaderTextNode(0, 10, 1, 1, [new PlainTextNode(2, 10)])])
        TextNodeTestUtils.isEqualWithoutCheckingParent(orgNode, expected);
    })

    it("can parse local image", () => {
        const orgParser = new TextParser()
        const orgNode = orgParser.parse("[[abc.png]]")
        const expected = new DocumentTextNode(0, 11, [
            new ImageTextNode(0, 11, "abc.png")
        ])
        TextNodeTestUtils.isEqualWithoutCheckingParent(orgNode, expected);
    })
});