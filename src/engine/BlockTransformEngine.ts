import TextNodeType from "../parser/node/type/TextNodeType";

export interface BlockTransformEngine {
    
    getBlockNodeType(line: string): TextNodeType | undefined;
}