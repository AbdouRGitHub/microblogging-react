import styles from "../styles/HeaderTitle.module.css";
import {ArrowLeft} from "lucide-react";
import {type NavigateFunction, useNavigate} from "react-router";

function HeaderTitle({title}: { title: string }) {
    const navigate: NavigateFunction = useNavigate();
    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>
                <a onClick={() => {
                    navigate(-1);
                }} className={styles.backLink}>
                    <ArrowLeft/>
                </a>
                <h2> {title} </h2>
            </div>
        </div>
    )
}

export default HeaderTitle;