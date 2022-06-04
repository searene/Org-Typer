import { css } from "@emotion/css";
import { RenderLeafProps } from "slate-react";
import OrgNodeType from "../parser/node/type/OrgNodeType";
import { InlineStyle } from "../style/InlineStyle";

export interface CustomLeafProps extends RenderLeafProps {
    leaf: {
        text: string,
        inlineStyles: Map<string, string> | undefined,
        type: OrgNodeType,
    }
}

export function Leaf(props: CustomLeafProps) {

    const getStyles = (inlineStyles: Map<string, string> | undefined) => {
        if (inlineStyles === undefined) {
            return css``;
        }
        const styleStatements = [];
        for (const [key, value] of inlineStyles) {
            styleStatements.push(`${key}: ${value};`);
        }
        return css`${styleStatements.join("\n")}`;
    }

    const renderSwitch = (props: CustomLeafProps) => {
        const styles = getStyles(props.leaf.inlineStyles);
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