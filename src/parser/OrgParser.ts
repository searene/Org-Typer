import OrgNode from "./node/OrgNode";
import TextOrgNode from "./node/TextOrgNode";

export default class OrgParser { 

    constructor(private readonly text: string) {
        
    }

    public parse(): OrgNode[] {
        let pos = 0;
        const res: OrgNode[] = [];
        while (true) {
            const orgNode = this.getNextNode(this.text, pos);
            if (orgNode === undefined) {
                break;
            }
            pos += orgNode.end;
            res.push(orgNode);
        }
        return res;
    }
    
    private getNextNode(text: string, pos: number): OrgNode | undefined {
        if (pos >= text.length) {
            return undefined;
        }
        return new TextOrgNode(pos, pos + text.length, text);
    }
}