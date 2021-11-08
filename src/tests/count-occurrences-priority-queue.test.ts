import SortDirection from "../enums/sort-direction";
import countOccurrencesPriorityQueue from "../utilities/count-occurrences-priority-queue";
import loremIpsum from "./text/lorem-ipsum";
import davidCopperfield from "./text/david-copperfield";

describe('countOccurrencesPriorityQueue', () => {
    describe('Generators', () => {
        test('countOrder DESC', () => {
            const data = countOccurrencesPriorityQueue('blah, Blah, blah one two three, One Two Blah, two')
            expect([...data.countOrderGenerator(SortDirection.DESC)]).toEqual([
                {"count": 4, "word": "blah"},
                {"count": 3, "word": "two"},
                {"count": 2, "word": "one"},
                {"count": 1, "word": "three"},
            ])
        });

        test('alphaOrder DESC', () => {
            const data = countOccurrencesPriorityQueue('blah, Blah, blah one two three, One Two Blah, two')
            expect([...data.alphaOrderGenerator(SortDirection.DESC)]).toEqual([
                {"count": 3, "word": "two"},
                {"count": 1, "word": "three"},
                {"count": 2, "word": "one"},
                {"count": 4, "word": "blah"},
            ])
        });
    });

    describe('Generators', () => {
        test('countOrder ASC', () => {
            const data = countOccurrencesPriorityQueue('blah, Blah, blah one two three, One Two Blah, two')
            expect([...data.countOrderGenerator(SortDirection.ASC)]).toEqual([
                {"count": 1, "word": "three"},
                {"count": 2, "word": "one"},
                {"count": 3, "word": "two"},
                {"count": 4, "word": "blah"},
            ])
        });

        test('alphaOrder ASC', () => {
            const data = countOccurrencesPriorityQueue('blah, Blah, blah one two three, One Two Blah, two')
            expect([...data.alphaOrderGenerator(SortDirection.ASC)]).toEqual([
                {"count": 4, "word": "blah"},
                {"count": 2, "word": "one"},
                {"count": 1, "word": "three"},
                {"count": 3, "word": "two"}
            ])
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
