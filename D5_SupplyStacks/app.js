const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");

let [crates, moves] = input.split("\n\n")
console.log(crates);

// ---------------------------------
// PARSE CRATES INTO A PROPER FORMAT
// ---------------------------------

// We "rotate" the string with the crates
// to more easily interpret it
crates = crates.split("\n");
const max = Math.max(...crates.map(e => e.length));

let orgCrates = [];

// We can't Array(max).fill([]) because it
// will think all arrays are a reference.
for (let i = 0; i < max; i++) {
    orgCrates.push([]);
}

for (let i = 0; i < crates.length; i++) {
    for (let k = 0; k < crates[i].length; k++) {
        orgCrates[k].push(crates[i][k]);
    }
}

orgCrates = orgCrates
    .map(e => e.reverse())
    .filter(e => Number(e[0]) != 0 && Number(e[0]) != NaN)
    .map(e => e.filter(x => x != " "))
    .map(e => e.slice(1))
    // This is a bit hacky, regardless it should work
    // Can't be bothered to find out why this happens
    .filter(e => e.length && !e.includes("]"))

console.log(orgCrates.map((e, k) => `${k+1} -> ${e.join(" ")}`).join("\n"));

// We create a copy to reuse for Part 2
let origCrates = orgCrates.map(function(arr) {
    return arr.slice();
});


// Parse Moves
console.log("Executing moves...");
moves = moves.split("\n");

/**
 * Moves `val` entries from `from` to `to`
 * by using a stack behaviour
 * @param {Number} val 
 * @param {Number} from 
 * @param {Number} to 
 */
function stackMove(val, from, to) {
    for (let i = 0; i < val; i++) {
        orgCrates[to - 1].push(orgCrates[from - 1].pop());
    }
}

/**
 * Moves `val` entries from `from` to `to`
 * by using a bundle behaviour
 * @param {Number} val 
 * @param {Number} from 
 * @param {Number} to 
 */
 function bundleMove(val, from, to) {
    let moveable = orgCrates[from - 1].slice(orgCrates[from - 1].length - val);
    orgCrates[from - 1].splice(orgCrates[from - 1].length - val);

    for (let i = 0; i < moveable.length; i++) {
        orgCrates[to - 1].push(moveable[i]);
    }
}

for (let i = 0; i < moves.length; i++) {
    const move = moves[i].split(" ");
    const val = move[1];
    const from = move[3];
    const to = move[5];

    console.log(`[Stack] Move ${val} crate(s) from ${from} to ${to}`);
    stackMove(val, from, to);
}

console.log(orgCrates.map((e, k) => `${k+1} -> ${e.join(" ")}`).join("\n"));
console.log("Part 1: %s", orgCrates.map(e => e.reverse()[0]).join(""))

// Part 2
orgCrates = [...origCrates];
console.log(orgCrates.map((e, k) => `${k+1} -> ${e.join(" ")}`).join("\n"));

for (let i = 0; i < moves.length; i++) {
    const move = moves[i].split(" ");
    const val = move[1];
    const from = move[3];
    const to = move[5];

    console.log(`[Bundle] Move ${val} crate(s) from ${from} to ${to}`);
    bundleMove(val, from, to);
}

console.log(orgCrates.map((e, k) => `${k+1} -> ${e.join(" ")}`).join("\n"));
console.log("Part 2: %s", orgCrates.map(e => e.reverse()[0]).join(""))