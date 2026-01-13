import styles from "../styles/FeedPostEditor.module.css"
import {ArrowUp} from "lucide-react";
import {useEffect, useRef} from "react";
import type {UseFormRegister} from "react-hook-form";


export type FeedEditorInputs = {
    content: string;
}

interface FeedPostEditorProps {
    register: UseFormRegister<FeedEditorInputs>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    placeholder?: string;
    defaultValue?: string;
}

function FeedPostEditor({
                            register,
                            onSubmit,
                            placeholder = 'Que voulez vous dire ?',
                            defaultValue = ''
                        }: FeedPostEditorProps) {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, [defaultValue]);

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <form className={styles.formContainer} onSubmit={onSubmit}>
                    <div className={styles.textContainer}>
                        <textarea
                            id="content"
                            defaultValue={defaultValue}
                            {...register("content", {
                                required: true,
                                maxLength: {value: 300, message: "300 caractères maximum"}
                            })}
                            ref={(e) => {
                                register("content").ref(e);
                                textareaRef.current = e;
                            }}
                            onInput = {autoResize}
                            placeholder={placeholder}
                            className={styles.textArea}/>
                    </div>
                    <div className={styles.optionsContainer}>
                        <button type="submit" className={styles.button}>
                            <ArrowUp className={styles.image}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FeedPostEditor;