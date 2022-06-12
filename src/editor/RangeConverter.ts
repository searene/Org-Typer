import { Path } from "slate";
import TextNode from "../parser/node/TextNode";
import TextNodeType from "../parser/node/type/TextNodeType";
import { CustomRange } from "./CustomRange";

export class RangeConverter {

    static convertTextNodeToRanges(textNode: TextNode, path: Path): CustomRange[] {
        if (!textNode.isLeaf()) {
            const childRanges = textNode.children.flatMap(child => RangeConverter.convertTextNodeToRanges(child, path));
            const ownRanges = RangeConverter.getOwnRanges(textNode, path);
            return [...childRanges, ...ownRanges];
        }
        const inlineStyles = textNode.getInlineStyles();
        if (textNode.nodeType == TextNodeType.Text && inlineStyles.size == 0) {
            return [];
        }
        return [RangeConverter.createCustomRange(textNode, path)];
    }

    private static createCustomRange(textNode: TextNode, path: Path): CustomRange {
        return {
            type: textNode.nodeType,
            inlineStyles: textNode.getInlineStyles(),
            anchor: { path, offset: textNode.start },
            focus: { path, offset: textNode.end }
        };
    }

    private static getOwnRanges(textNode: TextNode, path: Path): CustomRange[] {
        const prefixRange = RangeConverter.getPrefixRange(textNode, path);
        const suffixRange = RangeConverter.getSuffixRange(textNode, path);
        const res = [];
        if (prefixRange !== undefined) {
            res.push(prefixRange);
        }
        if (suffixRange !== undefined) {
            res.push(suffixRange);
        }
        return res;
    }

    private static getPrefixRange(textNode: TextNode, path: Path): CustomRange | undefined {
        return textNode.prefix === "" ? undefined : RangeConverter.createCustomRange(textNode, path);
    }

    private static getSuffixRange(textNode: TextNode, path: Path): CustomRange | undefined {
        return textNode.suffix === "" ? undefined : RangeConverter.createCustomRange(textNode, path);
    }
}