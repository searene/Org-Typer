import { css } from "@emotion/css";
import { RenderLeafProps } from "slate-react";
import OrgNodeType from "../parser/node/OrgNodeType";
import { InlineStyle } from "../style/InlineStyle";

export interface CustomLeafProps extends RenderLeafProps {
    leaf: {
        text: string,
        inlineStyles: Set<InlineStyle> | undefined,
        type: OrgNodeType,
    }
}

export function Leaf(props: CustomLeafProps) {

    const renderSwitch = (props: CustomLeafProps) => {
        console.log("props")
        console.log(props)
        return <span
                {...props.attributes}
                className={css`
                    font-weight: ${props.leaf.inlineStyles?.has(InlineStyle.Bold) && 'bold'};
                    font-style: ${props.leaf.inlineStyles?.has(InlineStyle.Italic) && 'italic'};
                `}
                >{props.children}</span>
    }

    return (
        <>
            {renderSwitch(props)}
        </>
    )
}