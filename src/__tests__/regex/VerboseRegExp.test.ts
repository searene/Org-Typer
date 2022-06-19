import { expect, describe, it } from 'vitest'
import {removeRegexComments} from "../../regex/VerboseRegExp";

describe("Test VerboseRegExp", () => {
    it("can add comments", () => {
        const regExp = new RegExp(removeRegexComments(`
            [1-9]{1}  // Numbers
            [a-zA-Z]{1} // Letters
        `))
        const match = regExp.test("1a")
        expect(match).toBe(true)
    })
})