import { Editor, Range, Node, Element, Point, Transforms, Path } from "slate";
import { ReactEditor } from "slate-react";
import { TableCellElement } from "../../slate-examples/examples/custom-types";
import { TableCellPosition } from "../leaf/TableCellPosition";

export type TableLayout = {
  rowCount: number,
  columnCount: number,
}

export type TablePosition = {
    rowIndex: number
    columnIndex: number
}

export class TableUtils {
    static withTable(editor: Editor) {
        const { deleteBackward, deleteForward, insertBreak } = editor

        editor.deleteBackward = unit => {
            const { selection } = editor

            if (selection && Range.isCollapsed(selection)) {
                const [cell] = Editor.nodes(editor, {
                    match: n =>
                        !Editor.isEditor(n) &&
                        Element.isElement(n) &&
                        n.type === 'tableCell',
                })

                if (cell) {
                    const [, cellPath] = cell
                    const start = Editor.start(editor, cellPath)

                    if (Point.equals(selection.anchor, start)) {
                        return
                    }
                }
            }

            deleteBackward(unit)
        }

        editor.deleteForward = unit => {
            const { selection } = editor

            if (selection && Range.isCollapsed(selection)) {
                const [cell] = Editor.nodes(editor, {
                    match: n =>
                        !Editor.isEditor(n) &&
                        Element.isElement(n) &&
                        n.type === 'tableCell',
                })

                if (cell) {
                    const [, cellPath] = cell
                    const end = Editor.end(editor, cellPath)

                    if (Point.equals(selection.anchor, end)) {
                        return
                    }
                }
            }

            deleteForward(unit)
        }

        editor.insertBreak = () => {
            const { selection } = editor

            if (selection) {
                const [table] = Editor.nodes(editor, {
                    match: n =>
                        !Editor.isEditor(n) &&
                        Element.isElement(n) &&
                        n.type === 'table',
                })

                if (table) {
                    return
                }
            }

            insertBreak()
        }

        return editor
    }

    static insertNewTable(editor: Editor) {
        const { selection } = editor;
        if (!selection || !Range.isCollapsed(selection)) {
            return;
        }
        const [pos] = Range.edges(selection)
        Transforms.insertNodes(editor, {
            type: 'table',
            children: [
                {
                    type: 'tableRow',
                    children: [
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                    ],
                },
                {
                    type: 'tableRow',
                    children: [
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                    ],
                },
                {
                    type: 'tableRow',
                    children: [
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                        {
                            type: 'tableCell',
                            children: [{ text: '' }],
                        },
                    ],
                },
            ],
        }, {
            at: pos
        });
        Transforms.removeNodes(editor, { at: pos })
    }

    static getPosition(tableCell: HTMLTableCellElement): TableCellPosition {
        return new TableCellPosition(tableCell.closest("tr")!.rowIndex, tableCell.cellIndex)
    }

    /**
     * We cannot use objects as map keys in javascript. If we do, javascript will check
     * equality by reference instead of doing a deep comparison. That's ridiculous, but
     * we have to accept it. I'll just use string as keys as a compromise.
     */
    static getPositions(cells: HTMLCollectionOf<HTMLTableCellElement>): Map<string, HTMLTableCellElement> {
        const map = new Map()
        for (const cell of cells) {
            const pos = this.getPosition(cell)
            const key = pos.toString()
            map.set(key, cell)
        }
        return map
    }

    static getTableLayout(td: HTMLTableCellElement): TableLayout {
        const tableElement = this.getTableElement(td)
        const tableRowElements = this.getTableRowElements(tableElement)
        const tableCellElements = this.getTableCellElements(tableRowElements[0]);
        return {
            rowCount: tableRowElements.length,
            columnCount: tableCellElements.length,
        }
    }

    static getTableCellPos(tableCell: HTMLTableCellElement): TablePosition {
        const row = tableCell.closest("tr")!
        return {
            rowIndex: row.rowIndex,
            columnIndex: tableCell.cellIndex,
        }
    }

    static getRowIndex(tableRow: HTMLTableRowElement, table: HTMLTableElement): number {
        const rows = this.getTableRowElements(table)
        return rows.indexOf(tableRow)
    }

    private static getTableCellElements(tableRow: HTMLTableRowElement): HTMLTableCellElement[] {
        const cells = tableRow.querySelectorAll("td")
        return Array.from(cells) as HTMLTableCellElement[]
    }

    private static getTableRowElements(table: HTMLTableElement): HTMLTableRowElement[] {
        const rows = table.querySelectorAll("tr")
        return Array.from(rows) as HTMLTableRowElement[]
    }

    private static getTableElement(td: HTMLTableCellElement): HTMLTableElement {
        let parent = td.parentElement
        while (parent!.tagName !== 'TABLE') {
            parent = parent!.parentElement
        }
        return parent! as HTMLTableElement
    }

}