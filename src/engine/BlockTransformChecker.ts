import TextNodeType from "../parser/node/type/TextNodeType";
import { BlockTransformEngine } from "./BlockTransformEngine";
import { CodeBlockTransformEngine } from "./impl/CodeBlockTransformEngine";

export class BlockTransformChecker {

    private static engines: BlockTransformEngine[] = [
        new CodeBlockTransformEngine()
    ];

    static getBlockNodeType(line: string): TextNodeType | undefined {
        for (const engine of this.engines) {
            const textNodeType = engine.getBlockNodeType(line);
            if (textNodeType !== undefined) {
                return textNodeType
            }
        }
        return undefined;
    }
}