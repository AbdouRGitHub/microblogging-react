import styles from "../styles/AccountSettings.module.css";

function AccountSettings() {
    return (
        <>
            <div className={styles.content}>
                    <form>
                        <label htmlFor="username">Pseudo</label>
                        <input type="text" name="username" placeholder="Pseudo"/>
                    </form>

                    <form>
                        <label htmlFor="username">Pseudo</label>
                        <input type="text" name="username" placeholder="Pseudo"/>
                    </form>

                    <form>
                        <label htmlFor="username">Pseudo</label>
                        <input type="text" name="username" placeholder="Pseudo"/>
                    </form>
            </div>
        </>
    )
}


export default AccountSettings;