import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from './styles.module.css';
import countOccurrences from "./utilities/count-occurences";

const App: FC = () => {
    const [text, setText] = useState<string>('');
    const [occurrences, setOccurrences] = useState<{ word: string, count: number }[] | null>(null);

    useEffect(() => {
        if (!text) {
            setOccurrences(null);
            return
        }
        setOccurrences(countOccurrences(text));
    }, [text]);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.pageWrapper}>
            <div style={{marginBottom: '1rem'}}>
                <label htmlFor='text' className={styles.label}>Count Word Occurrences</label>
                <textarea id='text' value={text} onChange={handleTextChange} className={styles.textarea}/>
            </div>
            {occurrences && <table>
                <thead>
                <tr>
                    <th>Word</th>
                    <th>Count</th>
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

export default App;
