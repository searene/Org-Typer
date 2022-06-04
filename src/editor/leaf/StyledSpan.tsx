import { css } from "@emotion/css";

interface StyledSpanProps {

    inheritedSlateAttributes: any;
    inheritedSlateChildren: React.ReactNode;
    bold: boolean;
    italic: boolean;
    underscore: boolean;
}

export function StyledSpan(props: StyledSpanProps) {

    return (
        <span {...props.inheritedSlateAttributes} className={css`
            font-weight: ${props.bold && 'bold'};
            font-style: ${props.italic && 'italic'};
            text-decoration: ${props.underscore && 'underline'};
        `}>
            {props.inheritedSlateChildren}
        </span>
    )
}