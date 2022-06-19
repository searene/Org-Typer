/**
 * @see https://keleshev.com/verbose-regular-expressions-in-javascript
 */
export function removeRegexComments(input: string) {
    let regexp = /(?<!\\)\s|\/\/.*|\/[*][\s\S]*[*]\//g;
    return input.replace(regexp, '')
}