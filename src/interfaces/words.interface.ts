import IOccurrences from "./occurrences.interface";
import SortDirection from "../enums/sort-direction";

export default interface IWords {
    addWord(word: string): void;
    removeWord(word: string): void;
    countOrderGenerator(sortDirection: SortDirection): Generator<IOccurrences>
    alphaOrderGenerator(sortDirection: SortDirection): Generator<IOccurrences>
    countOrder: IOccurrences[]
    alphaOrder: IOccurrences[]
}
