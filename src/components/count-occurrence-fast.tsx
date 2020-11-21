import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from '../styles.module.css';

const CountOccurrenceFunctional: FC = () => {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (!text) {
            return
        }
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
        </div>
    );
};

export default CountOccurrenceFunctional;
