import styles from "./styles/SignIn.module.css";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {authQueries} from "./hooks/mutations/auth.ts";
import {HTTPError} from "ky";
import AlertMessage from "../../shared/components/AlertMessage.tsx";

export type Inputs = {
    username: string;
    password: string;
}

function SignIn() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {mutate, isPending} = useMutation(authQueries.signIn(async () => {
        navigate("/home");
    }, async (error) => {
        if (error instanceof HTTPError) {
            const message = await error.response.text();
            setErrorMessage(message);
        } else {
            setErrorMessage("Une erreur est survenue, réessayez plus tard");
        }
    },));

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>({
        shouldFocusError: false,
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        mutate(data);
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.wrap}>
                    <div className={styles.mainContainer}>
                        <h1 className={styles.title}>Connexion</h1>
                        <div className={styles.form}>
                            {errorMessage && <AlertMessage type="error" message={errorMessage}/>}
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                <input type="text" placeholder="nom d'utilisateur"
                                       autoComplete="username"
                                       className={styles.input} {...register("username", {required: true})}/>
                                <input type="password" placeholder="mot de passe"
                                       autoComplete="current-password"
                                       className={styles.input} {...register("password", {required: true})}/>
                                <input type="submit" value="Se connecter" className={styles.submitBtn}
                                       disabled={isPending}/>
                            </form>
                        </div>
                    </div>
                    <p> Un projet par <a href="https://github.com/AbdouRGitHub" className={styles.linkGithub}> AbdouRGitHub</a></p>
                </div>
            </main>
        </>
    )
}

export default SignIn;