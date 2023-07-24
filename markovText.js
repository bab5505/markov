const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

// Read the input arguments from the command line
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error("Usage: node makeText.js <file|url> <source>");
  process.exit(1);
}

const sourceType = args[0];
const source = args[1];

// Function to handle errors and print a nice and complete error message
function handleError(error) {
  console.error("Error:", error.message);
  process.exit(1);
}

// Function to read text from a file
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}

// Function to fetch text from a URL
function fetchTextFromURL(url) {
  return axios.get(url).then((response) => response.data);
}

// Generate text from the source based on Markov chains
function generateText(text) {
  const mm = new MarkovMachine(text);
  const generatedText = mm.makeText();
  console.log(generatedText);
}

// Main function to handle the input source and call the appropriate function
async function main() {
  try {
    let text;

    if (sourceType === "file") {
      text = await readFile(source);
    } else if (sourceType === "url") {
      text = await fetchTextFromURL(source);
    } else {
      console.error("Invalid source type. Use 'file' or 'url'.");
      process.exit(1);
    }

    generateText(text);
  } catch (error) {
    handleError(error);
  }
}

main();
