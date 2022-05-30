import { RenderLeafProps } from "slate-react";
import OrgNodeType from "../parser/node/OrgNodeType";

export interface CustomLeafProps extends RenderLeafProps {
    leaf: {
        text: string,
        type: OrgNodeType,
    }
}

export function Leaf(props: CustomLeafProps) {
    return (
        <>
            {props.leaf.type == OrgNodeType.Text &&
                <span {...props.attributes}>{props.children}</span>}
        </>
    )
}