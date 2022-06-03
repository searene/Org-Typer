/**
 * A range of texts.
 */
export class TextRange {

    public start: number | undefined = undefined;
    public end: number | undefined = undefined;

    constructor() {

    }
    
    isEmpty(): boolean {
        return this.start == undefined;
    }

    isNotEmpty(): boolean {
        return !this.isEmpty();
    }

    update(newEndPos: number) {
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