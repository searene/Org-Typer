import { useEffect } from "react"
import { RenderElementProps } from "slate-react"
import CustomText from "../CustomText"
import { TableCellPosition } from "../leaf/TableCellPosition"
import { TableUtils } from "../table/TableUtils"

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

    const TYPER_TD_CONFIG_TOP = "typer-td-config-top"

    const TYPER_TD_CONFIG_LEFT = "typer-td-config-left"

    const getTopConfigureChild = (cell: HTMLTableCellElement): HTMLElement => {
        for (const child of cell.children) {
            if (child.className === TYPER_TD_CONFIG_TOP) {
                return child as HTMLElement
            }
        }
        throw new Error("Didn't find the top configure child")
    }

    const getLeftConfigureChild = (cell: HTMLTableCellElement): HTMLElement => {
        for (const child of cell.children) {
            if (child.className === TYPER_TD_CONFIG_LEFT) {
                return child as HTMLElement
            }
        }
    }

    useEffect(() => {
        const tableCells = document.getElementsByTagName("td")
        const positions = TableUtils.getPositions(tableCells)
        for (const cell of tableCells) {
            cell.addEventListener("mouseover", () => {
                const pos = TableUtils.getPosition(cell)
                const cellInFirstRow = positions.get(new TableCellPosition(0, pos.columnIndex).toString())!
                const cellInFirstColumn = positions.get(new TableCellPosition(pos.rowIndex, 0).toString())!
                const topConfigureTag = getTopConfigureChild(cellInFirstRow)
                const leftConfigureTag = getLeftConfigureChild(cellInFirstColumn)
                topConfigureTag.style.visibility = "visible"
                leftConfigureTag.style.visibility = "visible"
            })
            cell.addEventListener("mouseleave", () => {
                const pos = TableUtils.getPosition(cell)
                const cellInFirstRow = positions.get(new TableCellPosition(0, pos.columnIndex).toString())!
                const cellInFirstColumn = positions.get(new TableCellPosition(pos.rowIndex, 0).toString())!
                const topConfigureTag = getTopConfigureChild(cellInFirstRow)
                const leftConfigureTag = getLeftConfigureChild(cellInFirstColumn)
                topConfigureTag.style.visibility = "hidden"
                leftConfigureTag.style.visibility = "hidden"
            })
        }
    });

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
                <button className={TYPER_TD_CONFIG_TOP} style={{
                    position: "absolute",
                    left: "50%",
                    top: "0",
                    transform: "translate(-50%, -50%)",
                    visibility: "hidden",
                }}>test</button>
                <button className={TYPER_TD_CONFIG_LEFT} style={{
                    position: "absolute",
                    left : "0",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
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