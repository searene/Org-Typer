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
            return (
                <div style={{
                    width: "100%",
                }}>
                    <table style={{
                        borderCollapse: 'collapse',
                        width: "100%",
                    }}>
                        <tbody {...props.attributes}>{props.children}</tbody>
                    </table>
                </div>
            )
        } else if (props.element.type === 'tableRow') {
            return <tr {...props.attributes}>{props.children}</tr>
        } else if (props.element.type === 'tableCell') {
            return <td {...props.attributes} style={{
                border: "1px solid gray",
                padding: "10px",
                position: "relative",
            }}>
                <button style={{
                    position: "absolute",
                    left: "50%",
                    top: "0",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid black",
                    textAlign: "right",
                    visibility: "hidden",
                }}>test</button>
                <span>{props.children}</span>
            </td>
        } else {
            throw new Error(`Unknown element type: ${props.element.type}`)
        }
    }

    return getReactNode(props);
}