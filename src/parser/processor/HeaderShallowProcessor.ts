import HeaderTextNode from "../node/HeaderTextNode";
import TextNode from "../node/TextNode";
import { OffsetRange } from "../OffsetRange";
import { ShallowProcessor, ProcessedComponent } from "./interface/ComponentProcessor";

export class HeaderShallowProcessor implements ShallowProcessor {

    // TODO Check endPos?
    process(text: string, startPos: number, endPos: number): TextNode | undefined {
        const pattern = new RegExp(`^[^]{${startPos}}(^\\*+)(\\s+)(.*$)`, 'm')
        const match = pattern.exec(text);
        // TODO Need to check performance: https://stackoverflow.com/questions/72490669/how-to-match-a-regex-pattern-from-a-certain-position-in-javascript/72491006?noredirect=1
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