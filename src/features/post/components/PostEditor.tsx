import styles from "../styles/PostEditor.module.css"
import {ArrowUp} from "lucide-react";
import {useEffect, useRef} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";


export type FeedEditorInputs = {
    content: string;
}

interface FeedPostEditorProps {
    onSubmit: SubmitHandler<FeedEditorInputs>;
    placeholder?: string;
    defaultValue?: string;
}

function PostEditor({
                        onSubmit,
                        placeholder = 'Que voulez vous dire ?',
                        defaultValue = ''
                    }: FeedPostEditorProps) {

    const {
        register,
        handleSubmit,
        watch
    } = useForm<FeedEditorInputs>({
        shouldFocusError: false,

    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const content = watch("content", "");


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
                <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.textContainer}>
                        <textarea
                            id="content"
                            {...register("content", {
                                required: true,
                                maxLength: {value: 300, message: "300 caractères maximum"}
                            })}
                            ref={(e) => {
                                register("content").ref(e);
                                textareaRef.current = e;
                            }}
                            onInput={autoResize}
                            placeholder={placeholder}
                            className={styles.textArea}
                            maxLength={300}
                        />
                    </div>
                    <div className={styles.optionsContainer}>
                        {content.length > 0 && <span className={styles.lengthValue}>{content.length}/300</span>}
                        <button type="submit" className={styles.button}>
                            <ArrowUp className={styles.image}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostEditor;