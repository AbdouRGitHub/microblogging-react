import styles from "../styles/AlertMessage.module.css";

function AlertMessage({type = "info", message}: { type?: "error" | "success" | "info" , message: string }) {
    return (
        <>
            <div className={`${styles.container} ${styles[type]}`}>
                <p>
                    {message}
                </p>
            </div>
        </>
    )
}


export default AlertMessage;