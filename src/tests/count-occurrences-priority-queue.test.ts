import SortDirection from "../enums/sort-direction";
import countOccurrencesPriorityQueue from "../utilities/count-occurrences-priority-queue";
import loremIpsum from "./text/lorem-ipsum";
import davidCopperfield from "./text/david-copperfield";

describe('countOccurrencesPriorityQueue', () => {
    describe('Generators', () => {
        test('countOrder DESC', () => {
            const data = countOccurrencesPriorityQueue('blah, Blah, blah one two three four, One Two')
            expect([...data.countOrderGenerator(SortDirection.DESC)]).toEqual([{
                "count": 3,
                "word": "blah"
            }, {"count": 2, "word": "one"}, {"count": 2, "word": "two"}, {"count": 1, "word": "three"}, {
                "count": 1,
                "word": "four"
            }])
        });

        test('alphaOrder DESC', () => {
            const data = countOccurrencesPriorityQueue('blah, Blah, blah one two three four, One Two')
            expect([...data.alphaOrderGenerator(SortDirection.DESC)]).toEqual([{"count": 1, "word": "two"}, {
                "count": 2,
                "word": "three"
            }, {"count": 2, "word": "one"}, {"count": 1, "word": "four"}, {"count": 3, "word": "blah"}])
        });
    });

    describe('Lorem Ipsum', () => {
        const data = countOccurrencesPriorityQueue(loremIpsum);
        test('countOrder', () => {
            let lastCount = Infinity;
            for (const countOrder of [...data.countOrderGenerator(SortDirection.DESC)]) {
                expect(countOrder.count).toBeLessThanOrEqual(lastCount);
                lastCount = countOrder.count;
            }
        });
    });

    describe('David Copperfield', () => {
        const data = countOccurrencesPriorityQueue(davidCopperfield);
        test('countOrder', () => {
            let lastCount = Infinity;
            for (const countOrder of [...data.countOrderGenerator(SortDirection.DESC)]) {
                expect(countOrder.count).toBeLessThanOrEqual(lastCount);
                lastCount = countOrder.count;
            }
        });
    });
});
