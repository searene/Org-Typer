/**
 * @see https://keleshev.com/verbose-regular-expressions-in-javascript
 */
export function verboseRegExp(input: TemplateStringsArray) {
    if (input.raw.length !== 1) {
        throw Error('verboseRegExp: interpolation is not supported');
    }

    let source = input.raw[0];
    let regexp = /(?<!\\)\s|\/\/.*|\/[*][\s\S]*[*]\//g;
    let result = source.replace(regexp, '');

    return new RegExp(result);
}
