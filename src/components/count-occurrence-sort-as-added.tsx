import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from '../styles.module.css';
import IWords from "../interfaces/words.interface";
import countOccurrencesSortAsAdded from "../utilities/count-occurrences-sort-as-added";
import SortDirection from "../enums/sort-direction";
import IOccurrences from "../interfaces/occurrences.interface";
import SortOn from "../enums/sort-on";

const CountOccurrenceSortAsAdded: FC = () => {
    const [text, setText] = useState<string>('');
    const [words, setWords] = useState<IWords | null>(null);
    const [sortedWords, setSortedWords] = useState<IOccurrences[]>([]);
    const [sortOn, setSortOn] = useState<{type: SortOn, direction: SortDirection}>({type: SortOn.COUNT, direction: SortDirection.DESC});
    const [processingTime, setProcessingTime] = useState<number>(0);
    const [sortingTime, setSortingTime] = useState<number>(0);

    useEffect(() => {
        if (!text) {
            setWords(null);
            return;
        }
        const start = new Date();
        const newWords = countOccurrencesSortAsAdded(text);
        const end = new Date();
        setProcessingTime(end.getTime() - start.getTime());
        setWords(newWords);
    }, [text]);

    useEffect(() => {
        if(!words) {
            setSortedWords([]);
            return;
        }
        const start = new Date();
        let newSortedWords;
        switch (sortOn.type) {
            case SortOn.COUNT:
                newSortedWords = [...words.countOrderGenerator(sortOn.direction)];
                break;
            case SortOn.ALPHA:
                newSortedWords = [...words.alphaOrderGenerator(sortOn.direction)];
                break;
        }
        const end = new Date();
        setSortingTime(end.getTime() - start.getTime());
        setSortedWords(newSortedWords);
    }, [words, sortOn]);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.pageWrapper}>
            <div style={{marginBottom: '1rem'}}>
                <label htmlFor='text' className={styles.label}>Count Word Occurrences</label>
                <textarea id='text' value={text} onChange={handleTextChange} className={styles.textarea}/>
            </div>
            <p>Processing Time: {processingTime}</p>
            <p>Sorting Time: {sortingTime}</p>
            <button onClick={() => setSortOn({type: SortOn.COUNT, direction: SortDirection.DESC})}>Count Desc</button>
            <button onClick={() => setSortOn({type: SortOn.COUNT, direction: SortDirection.ASC})}>Count Asc</button>
            <button onClick={() => setSortOn({type: SortOn.ALPHA, direction: SortDirection.DESC})}>Alpha Desc</button>
            <button onClick={() => setSortOn({type: SortOn.ALPHA, direction: SortDirection.ASC})}>Alpha Asc</button>
            <table>
                <thead>
                <tr>
                    <th>Word</th>
                    <th>Count</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            {sortedWords.map(item => (
                <tr>
                    <td>{item.word}</td>
                    <td>{item.count}</td>
                </tr>
            ))}
        </div>
    );
};

export default CountOccurrenceSortAsAdded;
