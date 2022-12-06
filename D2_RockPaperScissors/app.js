const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").split("\n").map(e => e.split(" "));

const Scores = {
    Win: 6,
    Draw: 3,
    Lost: 0
}

const Table = {
    "X": {
        "A": Scores.Draw,
        "B": Scores.Lost,
        "C": Scores.Win
    },
    "Y": {
        "A": Scores.Win,
        "B": Scores.Draw,
        "C": Scores.Lost
    },
    "Z": {
        "A": Scores.Lost,
        "B": Scores.Win,
        "C": Scores.Draw
    },
    "A": {
        "X": Scores.Draw,
        "Y": Scores.Win,
        "Z": Scores.Lost
    },
    "B": {
        "X": Scores.Lost,
        "Y": Scores.Draw,
        "Z": Scores.Win
    },
    "C": {
        "X": Scores.Win,
        "Y": Scores.Lost,
        "Z": Scores.Draw
    }
}

function roundCalculator(moveSet) {
    return Table[moveSet[1]][moveSet[0]] + ["X", "Y", "Z"].indexOf(moveSet[1]) + 1;
}

// 1. What would your total score be if everything goes
// exactly according to your strategy guide?
console.log("Part 1: %d", input.map(i => roundCalculator(i)).reduce((a, b) => a + b))

// The Elf finishes helping with the tent and sneaks back over to you.
// "Anyway, the second column says how the round needs to end:
// X means you need to lose, Y means you need to end the round in a draw,
// and Z means you need to win. Good luck!"

// 2. Following the Elf's instructions for the second column,
// what would your total score be if everything goes exactly
// according to your strategy guide?
const RoundOutcome = {
    "X": Scores.Lost,
    "Y": Scores.Draw,
    "Z": Scores.Win
}

let transformed = [...input];
for (let i = 0; i < transformed.length; i++) {
    const outcome = RoundOutcome[transformed[i][1]];
    const move = Object.keys(Table[transformed[i][0]]).find(e => Table[transformed[i][0]][e] === outcome);
    console.log("The outcome for %s needs to be %d, thus the move against %s to achieve this is %s",
        transformed[i], outcome, transformed[i][0], move
    );
    transformed[i][1] = move;
}

console.log("Part 2: %d", transformed.map(i => roundCalculator(i)).reduce((a, b) => a + b))