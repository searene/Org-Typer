import { RenderLeafProps } from "slate-react";
import OrgNodeType from "../parser/node/OrgNodeType";

export interface CustomLeafProps extends RenderLeafProps {
    leaf: {
        text: string,
        type?: OrgNodeType,
    }
}

export function Leaf(props: CustomLeafProps) {

    const renderSwitch = (props: CustomLeafProps) => {
        switch (props.leaf.type) {
            case undefined:
            case OrgNodeType.Text:
                return <span {...props.attributes}>{props.children}</span>
            default:
                throw new Error("Unsupported node type: " + props.leaf.type)
        }
    }

    return (
        <>
            {renderSwitch(props)}
        </>
    )
}