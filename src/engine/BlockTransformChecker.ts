import OrgNodeType from "../parser/node/type/OrgNodeType";
import { BlockTransformEngine } from "./BlockTransformEngine";
import { CodeBlockTransformEngine } from "./impl/CodeBlockTransformEngine";

export class BlockTransformChecker {

    private static engines: BlockTransformEngine[] = [
        new CodeBlockTransformEngine()
    ];

    static getBlockNodeType(line: string): OrgNodeType | undefined {
        for (const engine of this.engines) {
            const orgNodeType = engine.getBlockNodeType(line);
            if (orgNodeType !== undefined) {
                return orgNodeType
            }
        }
        return undefined;
    }
}