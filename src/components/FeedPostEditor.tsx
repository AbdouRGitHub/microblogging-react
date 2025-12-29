import styles from "../styles/FeedPostEditor.module.css"
import {Send} from "lucide-react";

function FeedPostEditor() {
    return (
        <div className={styles.wrap}>
            <input type="text" className={styles.input} size={50} placeholder="QUOI DE NEUF?"/>
            <button className={styles.button}>
                <Send className={styles.image} size={20}/>
            </button>
        </div>
    )
}

export default FeedPostEditor;