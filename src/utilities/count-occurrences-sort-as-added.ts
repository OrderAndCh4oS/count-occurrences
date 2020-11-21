import IWords from "../interfaces/words.interface";
import Words from "./words";

const countOccurrencesSortAsAdded = (str: string) => {
    const words: IWords = new Words();
    let word = '';
    for (const char of str) {
        if (char.match(/[\p{L}\p{M}-]+/u)) {
            word += char;
            continue;
        }
        if (word) words.addWord(word.toLowerCase());
        word = '';
    }

    if (word) words.addWord(word.toLowerCase());

    return words;
};

export default countOccurrencesSortAsAdded;
