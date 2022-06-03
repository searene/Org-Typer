/**
 * A range of texts.
 */
export class OffsetRange {

    public start: number | undefined = undefined;
    public end: number | undefined = undefined;

    constructor() {

    }

    static get(start: number, end: number): OffsetRange {
        const offsetRange = new OffsetRange();
        offsetRange.start = start;
        offsetRange.end = end;
        return offsetRange;
    }

    isEmpty(): boolean {
        return this.start == undefined;
    }

    isNotEmpty(): boolean {
        return !this.isEmpty();
    }

    updateEndPos(newEndPos: number) {
        if (this.isEmpty()) {
            this.start = newEndPos - 1;
            this.end = newEndPos;
        } else {
            this.end = newEndPos;
        }
    }

    setEmpty() {
        this.start = undefined;
        this.end = undefined;
    }
}