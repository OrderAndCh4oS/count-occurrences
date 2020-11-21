import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from '../styles.module.css';
import countOccurrencesFunctional from "../utilities/count-occurences-functional";
import IOccurrences from "../interfaces/occurrences.interface";
import sortOnColumn, {ISortColumns, makeSortColumns} from "../utilities/sort-on-column";

const CountOccurrenceFunctional: FC = () => {
    const [text, setText] = useState<string>('');
    const [occurrences, setOccurrences] = useState<IOccurrences[] | null>(null);
    const [sortColumns, setSortColumns] = useState<ISortColumns<IOccurrences> | null>(null)

    useEffect(() => {
        if (!text) {
            setOccurrences(null);
            return
        }
        setOccurrences(countOccurrencesFunctional(text));
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
        setOccurrences(prevState => prevState ? [...prevState.sort(sortOnColumn<IOccurrences>(name, isAsc))] : null);
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
