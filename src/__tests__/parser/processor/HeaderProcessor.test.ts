import { expect, describe, it } from 'vitest'
import HeaderTextNode from '../../../parser/node/HeaderTextNode';
import { OffsetRange } from '../../../parser/OffsetRange';
import { HeaderShallowProcessor } from '../../../parser/processor/HeaderShallowProcessor';


describe("Test Header Processor", () => {

    it("can process header", () => {
        const headerProcessor = new HeaderShallowProcessor();
        const header = headerProcessor.process("* My Title", 0, 10);

        expect(header).toEqual(new HeaderTextNode(0, 10, 1, 1));
    });

    it("can process header starting from the second line", () => {
        const headerProcessor = new HeaderShallowProcessor();
        const header = headerProcessor.process("abc\n** My Title\nxyz", 4, 19);

        expect(header).toEqual(new HeaderTextNode(4, 15, 2, 1));
    })

    it("should return undefined when header is not found", () => {
        const headerProcessor = new HeaderShallowProcessor();
        const header = headerProcessor.process("abc\n** My Title\nxyz", 0, 19);
        expect(header).toBeUndefined();
    })
});