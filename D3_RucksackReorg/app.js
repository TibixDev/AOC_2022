const fs = require("fs");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const input = fs.readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map(e => e.split(""))

// Find the item type that appears in both compartments of each rucksack.
// What is the sum of the priorities of those item types?
let dupTotal = 0;
for (let i = 0; i < input.length; i++) {
    let compartiments = [
        input[i].slice(0, input[i].length/2),
        input[i].slice(input[i].length/2)
    ];
    const c0 = compartiments[0]
    const c1 =  compartiments[1]
    const dup = c0.find(e => c1.includes(e));
    const sum = alphabet.indexOf(dup) + 1;
    dupTotal += sum;
}
console.log("Part 1: %d", dupTotal)

// Find the item type that corresponds to the badges of each
// three-Elf group. What is the sum of the priorities of those
// item types?
let badgeTotal = 0;
for (let i = 2; i < input.length; i+=3) {
    const groupOfThree = [input[i], input[i-1], input[i-2]];
    let containsAll = alphabet.findIndex(e => groupOfThree.every(x => x.includes(e)));
    // console.log("Every instance in group [%d - %d] contains %s", i, i - 2, alphabet[containsAll])
    badgeTotal += containsAll + 1;
}
console.log("Part 2: %d", badgeTotal)