import OrgNodeType from "../../parser/node/type/OrgNodeType";
import { BlockTransformEngine } from "../BlockTransformEngine";

export class CodeBlockTransformEngine implements BlockTransformEngine {

    getBlockNodeType(line: string): OrgNodeType | undefined {
        if (line.startsWith("code") || line.startsWith("#+begin_src")) {
            return OrgNodeType.CodeBlock;
        }
        return undefined;
    }

}