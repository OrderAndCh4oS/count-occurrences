import IWords from "../interfaces/words.interface";
import IOccurrences from "../interfaces/occurrences.interface";
import SortDirection from "../enums/sort-direction";

export default class Words implements IWords {
    private _words: { [word: string]: { countIndex: number, alphaIndex: number } } = {};
    private _countOrder: IOccurrences[] = [];
    private _alphaOrder: IOccurrences[] = [];

    addWord(word: string) {
        if (word in this._words) {
            this.incrementCount(word);
            this.swimCount(word);
            this.swimAlpha(word);
        } else {
            this._words[word] = {countIndex: this._countOrder.length, alphaIndex: this._alphaOrder.length};
            this._countOrder.push({word, count: 1});
            this._alphaOrder.push({word, count: 1});
            this.swimAlpha(word);
        }
    }

    removeWord(word: string) {
        if (this._countOrder[this._words[word].countIndex].count > 1) {
            this.decrementCount(word);
            this.sinkCount(word);
        } else {
            this._countOrder.splice(this._words[word].countIndex, 1);
            this._alphaOrder.splice(this._words[word].alphaIndex, 1);
            for (let i = this._words[word].countIndex; i < this._countOrder.length; i++) {
                this._words[this._countOrder[i].word].countIndex = i;
            }
            for (let i = this._words[word].alphaIndex; i < this._alphaOrder.length; i++) {
                this._words[this._alphaOrder[i].word].alphaIndex = i;
            }
            delete this._words[word];
        }
    }

    get countOrder(): IOccurrences[] {
        return this._countOrder;
    }

    get alphaOrder(): IOccurrences[] {
        return this._alphaOrder;
    }

    * countOrderGenerator(sortDirection: SortDirection): Generator<IOccurrences> {
        let i;
        switch (sortDirection) {
            case SortDirection.ASC:
                for (i = this.countOrder.length - 1; i >= 0; i--) yield this.countOrder[i];
                break;
            case SortDirection.DESC:
                for (i = 0; i < this.countOrder.length; i++) yield this.countOrder[i];
                break;
        }
    }

    * alphaOrderGenerator(sortDirection: SortDirection): Generator<IOccurrences> {
        let i;
        switch (sortDirection) {
            case SortDirection.ASC:
                for (i = this.alphaOrder.length - 1; i >= 0; i--) yield this.alphaOrder[i];
                break;
            case SortDirection.DESC:
                for (i = 0; i < this.alphaOrder.length; i++) yield this.alphaOrder[i];
                break;
        }
    }

    private swimCount(word: string) {
        let i = this._words[word].countIndex;
        let j = i - 1;
        while (j >= 0 && this._countOrder[j].count <= this._countOrder[i].count) {
            this._words[word].countIndex = j;
            this._words[this._countOrder[j].word].countIndex = i;
            [this._countOrder[j], this._countOrder[i]] = [this._countOrder[i], this._countOrder[j]];
            j--;
            i--;
        }
    }

    private swimAlpha(word: string) {
        let i = this._words[word].alphaIndex;
        let j = i - 1;
        while (j >= 0 && this._alphaOrder[j].word.localeCompare(this._alphaOrder[i].word) < 0) {
            this._words[word].alphaIndex = j;
            this._words[this._alphaOrder[j].word].alphaIndex = i;
            [this._alphaOrder[j], this._alphaOrder[i]] = [this._alphaOrder[i], this._alphaOrder[j]];
            j--;
            i--;
        }
    }

    private sinkCount(word: string) {
        let i = this._words[word].countIndex;
        let j = i + 1;
        while (j < this._countOrder.length && this._countOrder[i].count < this._countOrder[j].count) {
            this._words[word].countIndex = j;
            this._words[this._countOrder[j].word].countIndex = i;
            [this._countOrder[j], this._countOrder[i]] = [this._countOrder[i], this._countOrder[j]];
            j++;
            i++;
        }
    }

    private incrementCount(word: string) {
        this._countOrder[this._words[word].countIndex].count += 1;
        this._alphaOrder[this._words[word].alphaIndex].count += 1;
    }

    private decrementCount(word: string) {
        this._countOrder[this._words[word].countIndex].count -= 1;
        this._alphaOrder[this._words[word].alphaIndex].count -= 1;
    }
}
