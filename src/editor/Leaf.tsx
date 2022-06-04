import { css } from "@emotion/css";
import { RenderLeafProps } from "slate-react";
import OrgNodeType from "../parser/node/type/OrgNodeType";
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
        const styles = css`
            font-weight: ${props.leaf.inlineStyles?.has(InlineStyle.Bold) && 'bold'};
            font-style: ${props.leaf.inlineStyles?.has(InlineStyle.Italic) && 'italic'};
            text-decoration: ${props.leaf.inlineStyles?.has(InlineStyle.Underscore) && 'underline'};
        `;
        if (props.leaf.type == OrgNodeType.Header) {
            return <h1 {...props.attributes} className={styles}>{props.children}</h1>;
        } else {
            return <span
                    {...props.attributes}
                    className={styles}
                    >{props.children}</span>
        }
    }

    return (
        <>
            {renderSwitch(props)}
        </>
    )
}