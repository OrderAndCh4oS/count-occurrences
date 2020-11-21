import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from '../styles.module.css';
import countOccurrencesFunctional from "../utilities/count-occurences-functional";
import IOccurrences from "../interfaces/occurrences.interface";
import sortOnColumn, {ISortColumns, makeSortColumns} from "../utilities/sort-on-column";

const CountOccurrenceFunctional: FC = () => {
    const [text, setText] = useState<string>('');
    const [occurrences, setOccurrences] = useState<IOccurrences[] | null>(null);
    const [sortColumns, setSortColumns] = useState<ISortColumns<IOccurrences> | null>(null)
    const [processingTime, setProcessingTime] = useState<number>(0);
    const [sortingTime, setSortingTime] = useState<number>(0);

    const performSort = (prevState: IOccurrences[], name: "word" | "count", isAsc: boolean) => {
        const start = new Date();
        const sorted = [...prevState.sort(sortOnColumn<IOccurrences>(name, isAsc))];
        const end = new Date();
        setSortingTime(end.getTime() - start.getTime());
        return sorted;
    };

    useEffect(() => {
        if (!text) {
            setOccurrences(null);
            return
        }
        const start = new Date();
        const newOccurrences = countOccurrencesFunctional(text);
        const end = new Date();
        setProcessingTime(end.getTime() - start.getTime());
        setOccurrences(newOccurrences);
    }, [text]);

    useEffect(() => {
        setSortColumns(makeSortColumns<IOccurrences>(['word', 'count']))
    }, []);

    const sortColumn = (name: keyof IOccurrences) => () => {
        if (sortColumns === null) return;
        setSortColumns(prevState => {
            if (!prevState) return null;
            return ({
                ...prevState,
                [name]: !prevState[name]
            });
        });
        sortBy(name, sortColumns[name]);
    }

    const sortBy = (name: keyof IOccurrences, isAsc: boolean) => {
        setOccurrences(prevState => prevState ? performSort(prevState, name, isAsc) : null);
    }

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
            {occurrences && sortColumns && <table>
                <thead>
                <tr>
                    <th>
                        <button
                            className={`${styles.button_tableHead} ${styles.text_alignLeft}`}
                            onClick={sortColumn('word')}
                        >Word
                        </button>
                    </th>
                    <th>
                        <button
                            className={`${styles.button_tableHead} ${styles.text_alignLeft}`}
                            onClick={sortColumn('count')}
                        >Count
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {occurrences.map(o => (
                    <tr>
                        <td>{o.word}</td>
                        <td>{o.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>}
        </div>
    );
};

export default CountOccurrenceFunctional;
