import TextNodeType from "../../parser/node/type/TextNodeType";
import { BlockTransformEngine } from "../BlockTransformEngine";

export class CodeBlockTransformEngine implements BlockTransformEngine {

    getBlockNodeType(line: string): TextNodeType | undefined {
        if (line.startsWith("#+BEGIN_SRC") || line.startsWith("#+begin_src")) {
            return TextNodeType.CodeBlock;
        }
        return undefined;
    }

}