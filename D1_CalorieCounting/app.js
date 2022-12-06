const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
let caloryDB = input.map(e => e.split("\n").map(Number).reduce((a, b) => a + b))

// 1. Find the Elf carrying the most Calories.
// How many total Calories is that Elf carrying?
console.log("Part 1: %d", Math.max(...caloryDB));

// 2. Find the top three Elves carrying the most Calories.
// How many Calories are those Elves carrying in total?
console.log("Part 2: %d", caloryDB.sort((a, b) => a - b).reverse().slice(0, 3).reduce((a, b) => a + b));