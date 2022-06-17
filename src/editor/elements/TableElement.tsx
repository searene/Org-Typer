import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { ReactEditor, RenderElementProps } from "slate-react"
import CustomText from "../CustomText"
import { TableCellPosition } from "../leaf/TableCellPosition"
import { TableLayout, TableUtils } from "../table/TableUtils"
import { Menu, Item, Separator, Submenu, useContextMenu, TriggerEvent, ItemParams } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { Editor, Path, Transforms, Node } from "slate"

export enum HorizontalDirection {
  Left,
  Right
}

type ContextMenuProps = {
  tableCellElement: HTMLTableCellElement,
  tableCellNode: Node,
}

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

enum ContextMenuOperation {
  InsertLeft = "InsertLeft",
  InsertRight = "InsertRight",
  TrashColumn = "TrashColumn",
}

export type TableElementProps = RenderElementProps & {
  editor: Editor
}

export const TableElement = (props: TableElementProps) => {

  const TYPER_TD_CONFIG_TOP = "typer-td-config typer-td-config-top"
  const TYPER_TD_CONFIG_LEFT = "typer-td-config typer-td-config-left"
  const TOP_MENU_ID = "table-top-menu";

  const { show } = useContextMenu({ id: TOP_MENU_ID });

  function handleItemClick(params: ItemParams, op: ContextMenuOperation) {
    const contextMenuProps: ContextMenuProps = params.props
    if (op === ContextMenuOperation.InsertLeft) {
      insertColumn(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode, HorizontalDirection.Left)
    } else if (op === ContextMenuOperation.InsertRight) {
      insertColumn(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode, HorizontalDirection.Right)
    } else {
      throw new Error("Unknown operation: " + op)
    }
  }

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
    throw new Error("Didn't find the left configure child")
  }

  const insertColumn = (currentTableCell: HTMLTableCellElement, editor: Editor, slateTableCellNode: Node, direction: HorizontalDirection) => {
    const currentTableCellPos = TableUtils.getPosition(currentTableCell)
    const tableLayout = TableUtils.getTableLayout(currentTableCell)
    let cellPath = ReactEditor.findPath(editor, slateTableCellNode)
    if (direction === HorizontalDirection.Right) {
      cellPath = Path.next(cellPath)
    }
    for (let i = 0; i < tableLayout.rowCount; i++) {
      Transforms.insertNodes(props.editor, {
        type: 'tableCell',
        children: [{ text: 'abc' }]
      }, {
        at: cellPath,
      })
      cellPath = Path.next(Path.parent(cellPath))
      cellPath.push(currentTableCellPos.columnIndex + (direction === HorizontalDirection.Left ? 0 : 1))
    }
  }

  useEffect(() => {
    // TODO What if we have multiple tables?
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

  const getReactNode = (props: TableElementProps): JSX.Element => {
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
          {/* TODO We will have multiple Menus with the same id if we have multiple tables, need to fix it */}
          <Menu id={TOP_MENU_ID} contentEditable={false}>
            <Item onClick={(params: ItemParams) => handleItemClick(params, ContextMenuOperation.InsertLeft)}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight: "10px"}}/>
              Insert Left
            </Item>
            <Item onClick={(params: ItemParams) => handleItemClick(params, ContextMenuOperation.InsertRight)}>
              <FontAwesomeIcon icon={faArrowRight} style={{paddingRight: "10px"}}/>
              Insert Right
            </Item>
            <Item onClick={(params: ItemParams) => handleItemClick(params, ContextMenuOperation.TrashColumn)}>
              <FontAwesomeIcon icon={faTrash} style={{paddingRight: "10px"}}/>
              Trash
            </Item>
          </Menu>
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
        <div contentEditable={false}
          className={TYPER_TD_CONFIG_TOP}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const contextMenuProps: ContextMenuProps = {
              tableCellElement: e.currentTarget.parentElement as HTMLTableCellElement,
              tableCellNode: props.element,
            }
            show(e, { props: contextMenuProps })
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "0",
            transform: "translate(-50%, -50%)",
            border: "1px dashed black",
            width: "50px",
            textAlign: "center",
            visibility: "hidden",
            backgroundColor: "white",
          }}>
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div contentEditable={false} className={TYPER_TD_CONFIG_LEFT} style={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px dashed black",
          margin: "auto",
          visibility: "hidden",
          backgroundColor: "white",
        }}>
          <FontAwesomeIcon icon={faGear} style={{
            paddingTop: "5px",
            paddingBottom: "5px",
          }} />
        </div>
        <span>{props.children}</span>
      </td>
    } else {
      throw new Error(`Unknown element type: ${props.element.type}`)
    }
  }

  return getReactNode(props);
}