import { RenderLeafProps } from "slate-react";
import OrgNode from "../parser/node/OrgNode";
import OrgNodeType from "../parser/node/type/OrgNodeType";
import { InlineStyle } from "../style/InlineStyle";
import { StyledSpan } from "./leaf/StyledSpan";

export interface CustomLeafProps extends RenderLeafProps {
    leaf: {
        text: string,
        inlineStyles: Set<InlineStyle> | undefined,
        type: OrgNodeType,
        orgNode: OrgNode;
    }
}

export function Leaf(props: CustomLeafProps) {

    return (
        <StyledSpan inheritedSlateAttributes={props.attributes}
                    orgNode={props.leaf.orgNode}>
            {props.children}
        </StyledSpan>
    )
}