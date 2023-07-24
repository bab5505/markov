/** Textual markov chain generator */
class MarkovMachine {

    /** build markov machine; read in text. */
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
    makeChains() {
      this.chains = {};
  
      for (let i = 0; i < this.words.length - 1; i++) {
        const word = this.words[i];
        const nextWord = this.words[i + 1];
        
        if (!this.chains[word]) {
          this.chains[word] = [];
        }
  
        this.chains[word].push(nextWord);
      }
  
      // Handle the last word in the text, where the next word is null.
      const lastWord = this.words[this.words.length - 1];
      if (!this.chains[lastWord]) {
        this.chains[lastWord] = [null];
      } else {
        this.chains[lastWord].push(null);
      }
    }
  
    /** return random text from chains */
    makeText(numWords = 100) {
      let output = [];
      let word = this.getRandomWord();
  
      while (output.length < numWords && word !== null) {
        output.push(word);
        word = this.getRandomNextWord(word);
      }
  
      return output.join(" ");
    }
  
    /** Helper function to get a random word from the chains */
    getRandomWord() {
      const words = Object.keys(this.chains);
      return words[Math.floor(Math.random() * words.length)];
    }
  
    /** Helper function to get a random next word for a given word from the chains */
    getRandomNextWord(word) {
      const nextWords = this.chains[word];
      return nextWords[Math.floor(Math.random() * nextWords.length)];
    }
  }
  
  module.exports = MarkovMachine;
  