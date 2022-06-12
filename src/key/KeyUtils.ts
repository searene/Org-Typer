import React from "react";

export class KeyUtils {
    static isCtrlKey(e: React.KeyboardEvent): boolean {
        // TODO Use Ctrl for Windows / Linux
        return e.metaKey;
    }
}