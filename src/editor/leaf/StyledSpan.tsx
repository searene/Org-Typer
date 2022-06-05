import { css } from "@emotion/css";
import OrgNode from "../../parser/node/OrgNode";

interface StyledSpanProps {

    inheritedSlateAttributes: {
        'data-slate-leaf': true;
    };
    children: React.ReactNode;
    orgNode: OrgNode;
}

export function StyledSpan(props: StyledSpanProps) {

    return (
        <span {...props.inheritedSlateAttributes}>
            {props.children}
        </span>
    )
}