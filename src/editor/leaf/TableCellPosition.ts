export class TableCellPosition {

    constructor(public rowIndex: number, public columnIndex: number) {}

    toString(): string {
        return `${this.rowIndex}|${this.columnIndex}`
    }

    static fromString(s: string): TableCellPosition {
        const split = s.split("|")
        return new TableCellPosition(parseInt(split[0]), parseInt(split[1]))
    }
}
