import HeaderTextNode from "../node/HeaderTextNode";
import TextNode from "../node/TextNode";
import { OffsetRange } from "../OffsetRange";
import { ShallowProcessor, ProcessedComponent } from "./interface/ComponentProcessor";

export class HeaderShallowProcessor implements ShallowProcessor {

    // TODO Check endPos?
    process(text: string, startPos: number, endPos: number): TextNode | undefined {
        const pattern = new RegExp(`^.{${startPos}}(?<=^|\n)(\\*+)(\\s+)([^\n]*)`, "s")
        const match = pattern.exec(text);
        if (match == null || match.index !== 0) {
            return undefined;
        }
        const headerLevel = match[1].length;
        const spaceCount = match[2].length;
        const headerContentsStartPos = startPos + headerLevel + spaceCount;
        const headerContentsEndPos = headerContentsStartPos + match[3].length;
        return new HeaderTextNode(startPos, headerContentsEndPos, headerLevel, spaceCount);
    }

}