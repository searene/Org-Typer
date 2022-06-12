import { RenderElementProps } from "slate-react"
import CustomText from "../CustomText"

export type TableElementType = {
    type: 'table',
    children: TableRowElementType[],
}

export type TableRowElementType = {
    type: 'tableRow',
    children: TableCellElementType[],
}

export type TableCellElementType = {
    type: 'tableCell',
    children: CustomText[],
}

export const TableElement = (props: RenderElementProps) => {

    const getReactNode = (props: RenderElementProps): JSX.Element => {
        if (props.element.type === 'table') {
            return <table style={{
                borderCollapse: 'collapse',
                border: "1px solid black",
            }}>
                <tbody {...props.attributes}>{props.children}</tbody>
            </table>
        } else if (props.element.type === 'tableRow') {
            return <tr {...props.attributes}>{props.children}</tr>
        } else if (props.element.type === 'tableCell') {
            return <td {...props.attributes} style={{
                border: "1px solid black",
                padding: "10px",
            }}>{props.children}</td>
        } else {
            throw new Error(`Unknown element type: ${props.element.type}`)
        }
    }

    return getReactNode(props);
}