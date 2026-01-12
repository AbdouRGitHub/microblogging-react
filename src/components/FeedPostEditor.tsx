import styles from "../styles/FeedPostEditor.module.css"
import {ArrowUp} from "lucide-react";
import {useEffect, useRef, useState} from "react";

function FeedPostEditor() {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, [value]);

    return (
    <div className={styles.container}>
        <div className={styles.wrap}>
            <div className={styles.textContainer}>
                    <textarea ref={textareaRef}
                              value={value}
                              onChange={(e) => setValue(e.target.value)} name="content" id="content"
                              placeholder="Que voulez vous dire ?"
                              className={styles.textArea}/>
            </div>
            <div className={styles.optionsContainer}>
                <button type="submit" className={styles.button}>
                    <ArrowUp className={styles.image}/>
                </button>
            </div>
        </div>
    </div>
)
}

export default FeedPostEditor;