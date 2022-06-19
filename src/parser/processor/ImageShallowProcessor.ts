import TextNode from "../node/TextNode";
import { ShallowProcessor } from "./interface/ComponentProcessor";
import ImageTextNode from "../node/ImageTextNode";
import {removeRegexComments} from "../../regex/VerboseRegExp";

export class ImageShallowProcessor implements ShallowProcessor {

    /**
     * Return an ImageTextNode if the text starts with it in the org-mode syntax.
     */
    process(text: string, startPos: number, endPos: number): TextNode | undefined {
        const substring = text.slice(0, endPos);
        const pattern = new RegExp(removeRegexComments(`
            ^.{${startPos}}                      // jump to the start position
            (?<=^|\n|)                           // start of a line
            (\\[\\[)                             // [[
            (                                    // start matching image links/files
            ([^\n]*\.(jpeg|jpg|png|gif|bmp|svg)) // image files
            |(https?://[^\n]*)                   // image links
            )                                    // end of matching image links/files
            (]])                                 // ]]
        `), 's')
        const match = pattern.exec(substring)
        if (match == null || match.index !== 0) {
            return undefined
        }
        const leadingBrackets = match[1]
        const url = match[2]
        const trailingBrackets = match[6]
        const imageNodeStartPos = startPos
        const imageNodeEndPos = startPos + leadingBrackets.length + url.length + trailingBrackets.length
        return new ImageTextNode(imageNodeStartPos, imageNodeEndPos, url)
    }

}