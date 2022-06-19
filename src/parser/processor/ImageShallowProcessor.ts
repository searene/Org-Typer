import TextNode from "../node/TextNode";
import { ShallowProcessor } from "./interface/ComponentProcessor";

export class ImageShallowProcessor implements ShallowProcessor {

    /**
     * Return an ImageTextNode if the text starts with it in the org-mode syntax.
     */
    process(text: string, startPos: number, endPos: number): TextNode | undefined {
        const pattern = new RegExp(`^.{${startPos}}(?:^|\n|)\[\[([^\n]*\.(jpeg|jpg|png|gif|bmp|svg))\]\]`, 's')
    }

}