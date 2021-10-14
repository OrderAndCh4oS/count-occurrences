import countOccurrencesFunctional from "../utilities/count-occurences-functional";
import loremIpsum from "./text/lorem-ipsum";
import davidCopperfield from "./text/david-copperfield";

describe('countOccurrencesFunctional', () => {
    const data = countOccurrencesFunctional('blah, Blah, blah one two three four, One Two');

    describe('Order', () => {
        test('countOrder', () => {
            expect(data).toEqual([{count: 3, word: "blah"}, {count: 2, word: "one"}, {count: 2, word: "two"}, {
                count: 1,
                word: "three"
            }, {count: 1, word: "four"}])
        });
        test('alphaOrder', () => {
            expect(data.sort((a, b) => a.word.localeCompare(b.word))).toEqual([{count: 3, word: "blah"}, {
                count: 1,
                word: "four"
            }, {count: 2, word: "one"}, {count: 1, word: "three"}, {count: 2, word: "two"}])
        });
    });

    describe('Lorem Ipsum', () => {
        const data = countOccurrencesFunctional(loremIpsum);
        test('countOrder', () => {
            let lastCount = Infinity;
            for (const countOrder of data) {
                expect(countOrder.count).toBeLessThanOrEqual(lastCount);
                lastCount = countOrder.count;
            }
        });
        test('alphaOrder', () => {
            const sortedData = data.sort((a, b) => a.word.localeCompare(b.word));
            for (let i = 0; i < sortedData.length - 1; i++) {
                expect(sortedData[i].word.localeCompare(sortedData[i + 1].word)).toBe(-1);
            }
        });
    });

    describe('David Copperfield', () => {
        const data = countOccurrencesFunctional(davidCopperfield);
        test('countOrder', () => {
            let lastCount = Infinity;
            for (const countOrder of data) {
                expect(countOrder.count).toBeLessThanOrEqual(lastCount);
                lastCount = countOrder.count;
            }
        });
        test('alphaOrder', () => {
            const sortedData = data.sort((a, b) => a.word.localeCompare(b.word));
            for (let i = 0; i < sortedData.length - 1; i++) {
                expect(sortedData[i].word.localeCompare(sortedData[i + 1].word)).toBe(-1);
            }
        });
    });
});
