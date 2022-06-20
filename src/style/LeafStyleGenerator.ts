export class InlineStyleGenerator {
    static getBoldInlineStyle(): [string, string] {
        return ["font-weight", "bold"];
    }
    static getItalicInlineStyle(): [string, string] {
        return ["font-style", "italic"];
    }
    static getUnderscoreInlineStyle(): [string, string] {
        return ["text-decoration", "underline"];
    }
    static getHeaderInlineStyles(level: number): Map<string, string> {
        if (level == 1) {
            return new Map([
                ["display", "block"],
                ["font-size", "2em"],
                ["margin-top", "0.67em"],
                ["margin-bottom", "0.67em"],
                ["margin-left", "0"],
                ["margin-right", "0"],
                ["font-weight", "bold"],
            ]);
        } else {
            // TODO Add more according to https://www.w3schools.com/tags/tag_hn.asp
            return new Map([
                ["display", "block"],
                ["font-size", "0.67em"],
                ["margin-top", "2.33em"],
                ["margin-bottom", "2.33em"],
                ["margin-left", "0"],
                ["margin-right", "0"],
                ["font-weight", "bold"],
            ]);
        }
    }
}