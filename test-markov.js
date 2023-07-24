const MarkovMachine = require('./markov');

describe('MarkovMachine', () => {
  const text = "the cat in the hat";

  test('makeChains builds correct chains', () => {
    const mm = new MarkovMachine(text);

    expect(mm.chains).toEqual({
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null],
    });
  });

  test('makeText generates random text with the correct number of words', () => {
    const mm = new MarkovMachine(text);
    const generatedText = mm.makeText(5);

    // Split the generated text and remove empty strings
    const generatedWords = generatedText.split(" ").filter(Boolean);

    expect(generatedWords.length).toBe(5);
  });
});
