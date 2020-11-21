import countOccurrencesSortAsAdded from "../utilities/count-occurrences-sort-as-added";
import SortDirection from "../enums/sort-direction";
import loremIpsum from "./text/lorem-ipsum";
import davidCopperfield from "./text/david-copperfield";

describe('countOccurrencesFast', () => {

    const data = countOccurrencesSortAsAdded('blah, Blah, blah one two three four, One Two')

    describe('Order', () => {
        test('countOrder', () => {
            expect(data.countOrder).toEqual([{count: 3, word: "blah"}, {count: 2, word: "two"}, {
                count: 2,
                word: "one"
            }, {count: 1, word: "three"}, {count: 1, word: "four"}])
        });
        test('alphaOrder', () => {
            expect(data.alphaOrder).toEqual([{count: 3, word: "blah"}, {count: 1, word: "four"}, {
                count: 2,
                word: "one"
            }, {count: 1, word: "three"}, {count: 2, word: "two"}])
        });
    });

    describe('Generators', () => {
        test('countOrder ASC', () => {
            expect([...data.countOrderGenerator(SortDirection.ASC)]).toEqual([{count: 1, word: "four"}, {
                count: 1,
                word: "three"
            }, {count: 2, word: "one"}, {count: 2, word: "two"}, {count: 3, word: "blah"}])
        });

        test('alphaOrder ASC', () => {
            expect([...data.alphaOrderGenerator(SortDirection.ASC)]).toEqual([{count: 2, word: "two"}, {
                count: 1,
                word: "three"
            }, {count: 2, word: "one"}, {count: 1, word: "four"}, {count: 3, word: "blah"}])
        });

        test('countOrder DESC', () => {
            expect([...data.countOrderGenerator(SortDirection.DESC)]).toEqual([{count: 3, word: "blah"}, {
                count: 2,
                word: "two"
            }, {count: 2, word: "one"}, {count: 1, word: "three"}, {count: 1, word: "four"}])
        });

        test('alphaOrder DESC', () => {
            expect([...data.alphaOrderGenerator(SortDirection.DESC)]).toEqual([{count: 3, word: "blah"}, {
                count: 1,
                word: "four"
            }, {count: 2, word: "one"}, {count: 1, word: "three"}, {count: 2, word: "two"}])
        });
    });

    describe('Remove Words', () => {
        test('Remove blah', () => {
            const data = countOccurrencesSortAsAdded('blah, blah, blah one two three four, one two')

            data.removeWord('blah');
            expect(data.countOrder).toEqual([{count: 2, word: "blah"}, {count: 2, word: "two"}, {
                count: 2,
                word: "one"
            }, {count: 1, word: "three"}, {count: 1, word: "four"}])
            expect(data.alphaOrder).toEqual([{count: 2, word: "blah"}, {count: 1, word: "four"}, {
                count: 2,
                word: "one"
            }, {count: 1, word: "three"}, {count: 2, word: "two"}])
        });
        test('Remove three', () => {
            const data = countOccurrencesSortAsAdded('blah, blah, blah one two three four, one two')

            data.removeWord('three');
            expect(data.countOrder).toEqual([{count: 3, word: "blah"}, {count: 2, word: "two"}, {
                count: 2,
                word: "one"
            }, {count: 1, word: "four"}])
            expect(data.alphaOrder).toEqual([{count: 3, word: "blah"}, {count: 1, word: "four"}, {
                count: 2,
                word: "one"
            }, {count: 2, word: "two"}])
        });
        test('Remove various', () => {
            const data = countOccurrencesSortAsAdded('blah, blah, blah one two three four, one two')

            data.removeWord('blah');
            data.removeWord('three');
            data.removeWord('blah');
            data.removeWord('one');
            data.removeWord('four');

            expect(data.countOrder).toEqual([{count: 2, word: "two"}, {count: 1, word: "one"}, {
                count: 1,
                word: "blah"
            }])
            expect(data.alphaOrder).toEqual([{count: 1, word: "blah"}, {count: 1, word: "one"}, {
                count: 2,
                word: "two"
            }])
        });
    });

    describe('Lorem Ipsum', () => {
        const data = countOccurrencesSortAsAdded(loremIpsum);
        test('countOrder', () => {
            let lastCount = Infinity;
            for (const countOrder of data.countOrder) {
                expect(countOrder.count).toBeLessThanOrEqual(lastCount);
                lastCount = countOrder.count;
            }
        });
        test('alphaOrder', () => {
            for (let i = 0; i < data.alphaOrder.length - 1; i++) {
                expect(data.alphaOrder[i].word.localeCompare(data.alphaOrder[i + 1].word)).toBe(-1);
            }
        });
    });

    describe('David Copperfield', () => {
        const data = countOccurrencesSortAsAdded(davidCopperfield);
        test('countOrder', () => {
            let lastCount = Infinity;
            for (const countOrder of data.countOrder) {
                expect(countOrder.count).toBeLessThanOrEqual(lastCount);
                lastCount = countOrder.count;
            }
        });
        test('alphaOrder', () => {
            for (let i = 0; i < data.alphaOrder.length - 1; i++) {
                expect(data.alphaOrder[i].word.localeCompare(data.alphaOrder[i + 1].word)).toBe(-1);
            }
        });
    });
});
