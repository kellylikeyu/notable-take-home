// This function is used to transcribe doctor's dictations to listed notes.

// Read doctor's dictation from a text file.
const fs = require("fs");
const string = fs
  .readFileSync("input.txt", "utf8")
  .replace(/(\r\n|\n|\r)/gm, "")
  .trim();

function transcribe(string) {
  // Create a map to get digit number
  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  // Use "Number" as an identifier to split each item
  const textArray = string.split("Number ");
  let num = 0;
  let output = [];
  for (let line of textArray) {
    const words = line.split(" ");

    // If the word after "Number" is a word of number or next, a digit number is added to the item
    if (numbers[words[0]] || words[0] === "next") {
      if (numbers[words[0]]) {
        num = numbers[words[0]];
      } else {
        num++;
      }
      words[0] = num.toString() + ".";
      // The first letter in each item is capitalized
      words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);
    }
    const eachLine = words.join(" ");
    output.push(eachLine + "\n");
  }
  return output.join("").trim();
}

console.log(transcribe(string));
