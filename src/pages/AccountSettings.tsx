import styles from "../styles/AccountSettings.module.css";
import {useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {userQueries} from "../hooks/queries/user.ts";


interface UsernameFormInputs {
    username: string;
}

interface EmailFormInputs {
    email: string;
}

interface PasswordFormInputs {
    newPassword: string;
    confirmPassword: string;
}

function AccountSettings() {
    const {data: user} = useQuery(userQueries.myDetails());

    const usernameForm = useForm<UsernameFormInputs>({
        values: {
            username: user ? user.username : ""
        }
    });
    const emailForm = useForm<EmailFormInputs>({
        values: {
            email: user ? user.email : ""
        }
    });
    const passwordForm = useForm<PasswordFormInputs>({
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    });

    const usernameIsDirty: boolean = usernameForm.formState.isDirty;
    const emailIsDirty: boolean = emailForm.formState.isDirty;
    const passwordIsDirty: boolean = passwordForm.formState.isDirty;

    const onSubmitUsername = usernameForm.handleSubmit(async (data: UsernameFormInputs) => {
    });
    const onSubmitEmail = emailForm.handleSubmit(async (data: EmailFormInputs) => {
    });
    const onSubmitPassword = passwordForm.handleSubmit(async (data: PasswordFormInputs) => {
    });

    return (
        <>
            <div className={styles.content}>
                <form className={styles.form}>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input {...usernameForm.register("username")} className={styles.settingsInput}/>
                    {
                        usernameIsDirty && <input type="submit" className={styles.settingsSubmit}
                                                  value="Enregistrer le nom d'utilisateur"/>
                    }
                </form>

                <form className={styles.form}>
                    <label htmlFor="email">Adresse mail</label>
                    <input {...emailForm.register("email")} className={styles.settingsInput}/>
                    {
                        emailIsDirty &&
                        <input type="submit" className={styles.settingsSubmit} value="Enregisrer le nom d'utilisateur"/>
                    }
                </form>

                <form className={styles.form}>
                    <label htmlFor="password">Mot de passe</label>
                    <input placeholder="nouveau mot de passe" {...passwordForm.register("newPassword")}
                           className={styles.settingsInput}/>
                    <input placeholder="confirmez le nouveau mot de passe" {...passwordForm.register("confirmPassword")}
                           className={styles.settingsInput}/>
                    {
                        passwordIsDirty && <input type="submit" className={styles.settingsSubmit}
                                                  value="Enregistrer le nom d'utilisateur"/>
                    }
                </form>
            </div>
        </>
    )
}


export default AccountSettings;