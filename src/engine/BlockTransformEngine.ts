import OrgNodeType from "../parser/node/type/OrgNodeType";

export interface BlockTransformEngine {
    
    getBlockNodeType(line: string): OrgNodeType | undefined;
}