import { RenderLeafProps } from "slate-react";
import TextNodeType from "../parser/node/type/TextNodeType";
import { InlineStyle } from "../style/InlineStyle";
import { StyledSpan } from "./leaf/StyledSpan";

export interface CustomLeafProps extends RenderLeafProps {
    leaf: {
        text: string,
        inlineStyles: Set<InlineStyle> | undefined,
        type: TextNodeType,
    }
}

export function Leaf(props: CustomLeafProps) {

    return (
        <StyledSpan inheritedSlateAttributes={props.attributes}
                    bold={props.leaf.inlineStyles?.has(InlineStyle.Bold) ?? false}
                    italic={props.leaf.inlineStyles?.has(InlineStyle.Italic) ?? false}
                    underscore={props.leaf.inlineStyles?.has(InlineStyle.Underscore) ?? false}
                    header={props.leaf.inlineStyles?.has(InlineStyle.Header) ?? false}>
            {props.children}
        </StyledSpan>
    )
}