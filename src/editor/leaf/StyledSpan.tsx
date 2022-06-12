import { css } from "@emotion/css";

interface StyledSpanProps {

    inheritedSlateAttributes: {
        'data-slate-leaf': true;
    };
    children: React.ReactNode;
    bold: boolean;
    italic: boolean;
    underscore: boolean;
    header: boolean;
}

export function StyledSpan(props: StyledSpanProps) {

    return (
        <span {...props.inheritedSlateAttributes} className={css`
            font-weight: ${(props.bold || props.header) && 'bold'};
            font-style: ${props.italic && 'italic'};
            text-decoration: ${props.underscore && 'underline'};
            font-size: ${props.header && '1.5em'};
        `}>
            {props.children}
        </span>
    )
}