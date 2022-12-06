const fs = require("fs");

/**
 * Generates an array with a range, for example:
 * `(1, 4) => [1, 2, 3, 4]`
 * @param {Number} start 
 * @param {Number} end 
 */
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const input = fs.readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map(e => e.split(","))
    .map(e => e.map(x => x.split("-").map(Number)))

// In how many assignment pairs does one range
// fully contain the other?
let fullOverlaps = 0;
for (let i = 0; i < input.length; i++) {
    const p1 = input[i][0];
    const p2 = input[i][1];
    if (p2[0] >= p1[0] && p2[1] <= p1[1]) {
        fullOverlaps++;
    }
    else if (p1[0] >= p2[0] && p1[1] <= p2[1]) {
        fullOverlaps++;
    }
}
console.log("Part 1: %d", fullOverlaps)



// In how many assignment pairs do the ranges overlap?
let partialOverlaps = 0;
for (let i = 0; i < input.length; i++) {
    const p1 = input[i][0];
    const p2 = input[i][1];

    // You could solve it like the previous
    // one, but my brain is too small.
    // Here's a dumb solution instead:
    const p1Arr = range(p1[0], p1[1]);
    const p2Arr = range(p2[0], p2[1]);
    if (p1Arr.some(e => p2Arr.includes(e)) || p2Arr.some(e => p1Arr.includes(e))) {
        partialOverlaps++;
    }
}
console.log("Part 2: %d", partialOverlaps)