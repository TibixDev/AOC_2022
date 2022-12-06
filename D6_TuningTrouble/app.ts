const fs = require("fs");

const input: string[] = fs.readFileSync("./input.txt", "utf-8").split("");

// How many characters need to be processed
// before the first start-of-packet marker
// is detected? (For size 4 and 14)

/**
 * Locate the first segment where no characters are duplicate
 * @param data - The data to be scanned
 * @param packetLen - Packet length
 * @returns {number} The index of the first match if found, -1 otherwise
 */
function locateFirstPacket(data: string[], packetLen: number) {
    for (let i = packetLen; i < input.length; i++) {
        const packet = input.slice(i - packetLen, i);
        //console.log(`${i} -> ${packet}`);
        const isPacketStart = packet.every(e => packet.filter(x => x != e).length === packetLen - 1);
        if (isPacketStart) {
            return i;
        }
    }
    return -1;
}

console.time("Process")
console.log("Part 1: %d", locateFirstPacket(input, 4));
console.log("Part 2: %d", locateFirstPacket(input, 14));
console.timeEnd("Process")