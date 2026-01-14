import profileStyles from "../styles/Profile.module.css";
import styles from "../styles/Profile.module.css";
import HeaderTitle from "../components/HeaderTitle.tsx";

function AccountNotFound() {
    return (
        <>
            <main className={profileStyles.content}>
                <div className={profileStyles.wrap}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <HeaderTitle title="Profile"/>
                        </div>
                    </div>
                    <h1> Ce compte n'existe pas </h1>
                </div>
            </main>
        </>
    )
}


export default AccountNotFound;