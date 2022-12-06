/**
 * Generates an array with a range, for example:
 * `(1, 4) => [1, 2, 3, 4]`
 * @param {Number} start 
 * @param {Number} end 
 */
export function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}