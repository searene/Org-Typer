import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faArrowLeft, faArrowRight, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { ReactEditor, RenderElementProps } from "slate-react"
import CustomText from "../CustomText"
import { TableCellPosition } from "../leaf/TableCellPosition"
import { TableLayout, TablePosition, TableUtils } from "../table/TableUtils"
import { Menu, Item, Separator, Submenu, useContextMenu, TriggerEvent, ItemParams, contextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { Editor, Path, Transforms, Node } from "slate"
import Cell from "../../editable-table-example/Cell"

export enum HorizontalDirection {
  Left,
  Right
}

export enum VerticalDirection {
  Up,
  Down
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
  
  InsertAbove = "InsertAbove",
  InsertBelow = "InsertBelow",
  TrashRow = "TrashRow",
}

export type TableElementProps = RenderElementProps & {
  editor: Editor
}

export const TableElement = (props: TableElementProps) => {

  const TYPER_TD_CONFIG_FOR_COLUMN = "typer-td-config typer-td-config-top"
  const TYPER_TD_CONFIG_FOR_ROW = "typer-td-config typer-td-config-left"
  const COLUMN_MENU_ID = "table-column-menu"
  const ROW_MENU_ID = "table-row-menu"

  const { show: showColumnMenu } = useContextMenu({ id: COLUMN_MENU_ID });
  const { show: showRowMenu } = useContextMenu({id: ROW_MENU_ID })
  const tableRef = useRef<HTMLTableElement>(null)

  function handleItemClick(params: ItemParams, op: ContextMenuOperation) {
    const contextMenuProps: ContextMenuProps = params.props
    if (op === ContextMenuOperation.InsertLeft) {
      insertColumn(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode, HorizontalDirection.Left)
    } else if (op === ContextMenuOperation.InsertRight) {
      insertColumn(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode, HorizontalDirection.Right)
    } else if (op === ContextMenuOperation.TrashColumn) {
      deleteColumn(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode)
    } else if (op === ContextMenuOperation.InsertAbove) {
      insertRow(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode, VerticalDirection.Up)
    } else if (op === ContextMenuOperation.InsertBelow) {
      insertRow(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode, VerticalDirection.Down)
    } else if (op === ContextMenuOperation.TrashRow) {
      deleteRow(contextMenuProps.tableCellElement, props.editor, contextMenuProps.tableCellNode)
    } else {
      throw new Error("Unknown operation: " + op)
    }
  }

  const getTopConfigureChild = (cell: HTMLTableCellElement): HTMLElement => {
    for (const child of cell.children) {
      if (child.className === TYPER_TD_CONFIG_FOR_COLUMN) {
        return child as HTMLElement
      }
    }
    throw new Error("Didn't find the top configure child")
  }

  const getLeftConfigureChild = (cell: HTMLTableCellElement): HTMLElement => {
    for (const child of cell.children) {
      if (child.className === TYPER_TD_CONFIG_FOR_ROW) {
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
        children: [{ text: '' }]
      }, {
        at: cellPath,
      })
      cellPath = Path.next(Path.parent(cellPath))
      cellPath.push(currentTableCellPos.columnIndex + (direction === HorizontalDirection.Left ? 0 : 1))
    }
  }

  const deleteColumn = (currentTableCell: HTMLTableCellElement, editor: Editor, slateTableCellNode: Node) => {
    const currentTableCellPos = TableUtils.getPosition(currentTableCell)
    const tableLayout = TableUtils.getTableLayout(currentTableCell) 
    let cellPath = ReactEditor.findPath(editor, slateTableCellNode)
    for (let i = 0; i < tableLayout.rowCount; i++) {
      Transforms.delete(props.editor, {
        at: cellPath,
      })
      cellPath = Path.next(Path.parent(cellPath))
      cellPath.push(currentTableCellPos.columnIndex)
    }
  }

  const deleteRow = (currentTableCell: HTMLTableCellElement, editor: Editor, slateTableCellNode: Node) => {
    const cellPath = ReactEditor.findPath(editor, slateTableCellNode)
    const rowPath = Path.parent(cellPath)
    Transforms.delete(props.editor, {
      at: rowPath,
    })
  }

  const insertRow = (currentTableCell: HTMLTableCellElement, editor: Editor, slateTableCellNode: Node, direction: VerticalDirection) => {
    const tableLayout = TableUtils.getTableLayout(currentTableCell)
    const cellPath = ReactEditor.findPath(editor, slateTableCellNode)
    let rowPath = Path.parent(cellPath)
    const children: TableCellElementType[] = []
    for (let i = 0; i < tableLayout.columnCount; i++) {
      children.push({ type: 'tableCell', children: [{ text: '' }] })
    }
    Transforms.insertNodes(props.editor, {
      type: 'tableRow',
      children: children,
    }, {
      at: direction === VerticalDirection.Up ? rowPath : Path.next(rowPath),
    })
  }

  const cellMouseoverEventListener = (cell: HTMLTableCellElement, posToCellMap: Map<string, HTMLTableCellElement>) => {
    const pos = TableUtils.getPosition(cell)
    const cellInFirstRow = posToCellMap.get(new TableCellPosition(0, pos.columnIndex).toString())!
    const cellInFirstColumn = posToCellMap.get(new TableCellPosition(pos.rowIndex, 0).toString())!
    const topConfigureTag = getTopConfigureChild(cellInFirstRow)
    const leftConfigureTag = getLeftConfigureChild(cellInFirstColumn)
    topConfigureTag.style.visibility = "visible"
    leftConfigureTag.style.visibility = "visible"
  }

  const cellMouseleaveEventListener = (cell: HTMLTableCellElement, posToCellMap: Map<string, HTMLTableCellElement>) => {
    const pos = TableUtils.getPosition(cell)
    const cellInFirstRow = posToCellMap.get(new TableCellPosition(0, pos.columnIndex).toString())!
    const cellInFirstColumn = posToCellMap.get(new TableCellPosition(pos.rowIndex, 0).toString())!
    const topConfigureTag = getTopConfigureChild(cellInFirstRow)
    const leftConfigureTag = getLeftConfigureChild(cellInFirstColumn)
    topConfigureTag.style.visibility = "hidden"
    leftConfigureTag.style.visibility = "hidden"
  }

  useEffect(() => {
    // TODO What if we have multiple tables?
    const tableCells = document.getElementsByTagName("td")
    const positions = TableUtils.getPositions(tableCells)
    const cellToMouseoverEventListenerMap = new Map<HTMLTableCellElement, () => void>()
    const cellToMouseleaveEventListenerMap = new Map<HTMLTableCellElement, () => void>()
    for (const cell of tableCells) {
      const mouseoverEventListener = () => cellMouseoverEventListener(cell, positions)
      const mouseleaveEventListener = () => cellMouseleaveEventListener(cell, positions)
      cell.addEventListener("mouseover", mouseoverEventListener)
      cell.addEventListener("mouseleave", mouseleaveEventListener)
      cellToMouseoverEventListenerMap.set(cell, mouseoverEventListener)
      cellToMouseleaveEventListenerMap.set(cell, mouseleaveEventListener)
    }
    return () => {
      for (const cell of tableCells) {
        cell.removeEventListener("mouseover", cellToMouseoverEventListenerMap.get(cell)!)
        cell.removeEventListener("mouseleave", cellToMouseleaveEventListenerMap.get(cell)!)
      }
    }
  })

  useEffect(() => {
    if (tableRef.current === null) {
      return
    }
    const table = tableRef.current
    const tableParent = table.parentElement as HTMLDivElement
    const tableTopOptions = table.previousSibling as HTMLDivElement
    const mouseoverEventListener = () => {
      tableTopOptions.style.visibility = "visible"
    }
    const mouseleaveEventListener = () => {
      tableTopOptions.style.visibility = "hidden"
    }
    tableParent.addEventListener("mouseover", mouseoverEventListener)
    tableParent.addEventListener("mouseleave", mouseleaveEventListener)
    return () => {
      tableParent.removeEventListener("mouseover", mouseoverEventListener)
      tableParent.removeEventListener("mouseleave", mouseleaveEventListener)
    }
  })

  const getReactNode = (props: TableElementProps): JSX.Element => {
    if (props.element.type === 'table') {
      return (
        <div style={{
          width: "100%",
        }}>
          <div style={{
              width: "100%",
              backgroundColor: "#eeeeee",
              padding: "10px",
              boxSizing: "border-box",
              visibility: "hidden",
            }}
            >
            <FontAwesomeIcon title="Delete the table"
              icon={faTrash} size="1x" className="hover-pointer" style={{
              paddingLeft: "10px",
              paddingRight: "10px",
            }} onClick={() => {
              Transforms.delete(props.editor, {
                at: ReactEditor.findPath(props.editor, props.element),
              })
            }}/>
          </div>
          <table style={{
            borderCollapse: 'collapse',
            width: "100%",
          }}
            ref={tableRef}>
            <tbody {...props.attributes}>{props.children}</tbody>
          </table>
          {/* TODO We will have multiple Menus with the same id if we have multiple tables, need to fix it */}
          <Menu id={COLUMN_MENU_ID} contentEditable={false}>
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
              Trash The Current Column
            </Item>
          </Menu>
          <Menu id={ROW_MENU_ID} contentEditable={false}>
            <Item onClick={(params: ItemParams) => handleItemClick(params, ContextMenuOperation.InsertAbove)}>
              <FontAwesomeIcon icon={faArrowUp} style={{paddingRight: "10px"}}/>
              Insert Above
            </Item>
            <Item onClick={(params: ItemParams) => handleItemClick(params, ContextMenuOperation.InsertBelow)}>
              <FontAwesomeIcon icon={faArrowDown} style={{paddingRight: "10px"}}/>
              Insert Below
            </Item>
            <Item onClick={(params: ItemParams) => handleItemClick(params, ContextMenuOperation.TrashRow)}>
              <FontAwesomeIcon icon={faTrash} style={{paddingRight: "10px"}}/>
              Trash The Current Row
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
          className={TYPER_TD_CONFIG_FOR_COLUMN}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const contextMenuProps: ContextMenuProps = {
              tableCellElement: e.currentTarget.parentElement as HTMLTableCellElement,
              tableCellNode: props.element,
            }
            showColumnMenu(e, { props: contextMenuProps })
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
        <div contentEditable={false} className={TYPER_TD_CONFIG_FOR_ROW} 
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const contextMenuProps: ContextMenuProps = {
              tableCellElement: e.currentTarget.parentElement as HTMLTableCellElement,
              tableCellNode: props.element,
            }
            showRowMenu(e, { props: contextMenuProps })
          }}
          style={{
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