import type {UseFormRegisterReturn} from "react-hook-form";
import styles from "../styles/Input.module.css";

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    autoComplete?: string;
    register?: UseFormRegisterReturn;
}

function Input({type = "text", placeholder, value, autoComplete, register}: InputProps) {
    return (
        <>
            <input type={type}
                   placeholder={placeholder}
                   value={value}
                   autoComplete={autoComplete}
                   {...register}
                   className={styles.input}
            />
        </>
    )
}


export default Input;