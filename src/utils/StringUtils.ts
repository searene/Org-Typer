export class StringUtils {
    static isLineStart(text: string, pos: number): boolean {
        if (pos == 0) {
            return true;
        }
        if (text[pos - 1] == '\n') {
            return true;
        }
        return false;
    }

    static isWhitespace(c: string): boolean {
        return c == ' ' || c == '\t';
    }

    static skipWhitespaces(text: string, start: number, end: number): number {
        let pos = start;
        while (pos < end && StringUtils.isWhitespace(text[pos])) {
            pos++;
        }
    }

    static isNewLineChar(char: string): boolean {
        return char == '\n' || char == '\r';
    }

}