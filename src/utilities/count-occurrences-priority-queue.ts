import SortDirection from "../enums/sort-direction";
import IOccurrences from "../interfaces/occurrences.interface";

class PriorityQueue {
    private _sortOn: string;
    private _n = 0

    constructor(sortOn: string) {
        this._sortOn = sortOn;
    }

    private _priorityQueue: any[] = [null]

    get priorityQueue(): any[] {
        return this._priorityQueue;
    }

    insert(a: any) {
        this._priorityQueue.push(a)
        this._n += 1
        const key = this.swim(this.size())

        if (!this.isMaxHeap(1)) throw new Error('Not max heap!');
        return key;
    }

    swim(key: number) {
        let lastKey = key;
        while (key > 1 && this.less(key / 2, key)) {
            this.exchange(key, key / 2)
            lastKey = key;
            key = key / 2
        }

        return ~~lastKey;
    }

    sink(key: number) {
        let lastKey = key;
        while (key * 2 <= this.size()) {
            let j = key * 2
            if (j < this.size() && this.less(j, j + 1)) {
                j += 1
            }
            if (!this.less(key, j)) {
                break
            }
            this.exchange(key, j)
            lastKey = j;
            key = j
        }
        return ~~lastKey;
    }

    less(i: number, j: number) {
        if (this._priorityQueue[~~i] === null || this._priorityQueue[~~j] === null) {
            return false
        }

        return this._priorityQueue[~~i][this._sortOn] < this._priorityQueue[~~j][this._sortOn]
    }

    exchange(i: number, j: number) {
        [this._priorityQueue[~~i], this._priorityQueue[~~j]] = [this._priorityQueue[~~j], this._priorityQueue[~~i]]
    }

    isMaxHeap(key: number): boolean {
        if (key > this.size()) {
            return true
        }
        let left = key * 2;
        let right = key * 2 + 1;
        if (left < this.size() && this.less(key, left)) {
            return false
        }
        if (right < this.size() && this.less(key, right)) {
            return false
        }
        return this.isMaxHeap(left) && this.isMaxHeap(right)
    }

    max() {
        return this._priorityQueue[1]
    }

    popMax() {
        this.exchange(1, this.size())
        const maximum = this._priorityQueue.pop()
        this._n -= 1
        this.sink(1)

        if (!this.isMaxHeap(1)) throw new Error('Not max heap!!')

        return maximum
    }

    isEmpty() {
        return this._n == 0
    }

    size() {
        return this._n
    }
}

class Words {
    private _words: { [word: string]: { countIndex: number, alphaIndex: number } } = {};
    private _countOrder: PriorityQueue = new PriorityQueue('count');
    private _alphaOrder: PriorityQueue = new PriorityQueue('word');

    addWord(word: string) {
        if (word in this._words) {
            this.incrementCount(word);
            const countIndex = this._countOrder.swim(this._words[word].countIndex);
            const alphaIndex = this._alphaOrder.swim(this._words[word].alphaIndex);
            this._words[word] = {countIndex, alphaIndex};
        } else {
            const countIndex = this._countOrder.insert({word, count: 1});
            const alphaIndex = this._alphaOrder.insert({word, count: 1});
            this._words[word] = {countIndex, alphaIndex};
        }
    }

    * countOrderGenerator(sortDirection: SortDirection): Generator<IOccurrences> {
        let i;
        switch (sortDirection) {
            case SortDirection.ASC:
                break;
            case SortDirection.DESC:
                const size = this._countOrder.size();
                for (i = 0; i < size; i++) {
                    yield this._countOrder.popMax()
                }
                break;
        }
    }

    * alphaOrderGenerator(sortDirection: SortDirection): Generator<IOccurrences> {
        let i;
        switch (sortDirection) {
            case SortDirection.ASC:
                break;
            case SortDirection.DESC:
                const size = this._countOrder.size();
                for (i = 0; i < size; i++) yield this._alphaOrder.popMax()
                break;
        }
    }

    private incrementCount(word: string) {
        this._countOrder.priorityQueue[this._words[word].countIndex].count += 1;
        this._alphaOrder.priorityQueue[this._words[word].alphaIndex].count += 1;
    }

    private decrementCount(word: string) {
        this._countOrder.priorityQueue[this._words[word].countIndex].count -= 1;
        this._alphaOrder.priorityQueue[this._words[word].alphaIndex].count -= 1;
    }
}

const countOccurrencesPriorityQueue = (str: string) => {
    const words = new Words();
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

export default countOccurrencesPriorityQueue;
