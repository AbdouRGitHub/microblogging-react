import {useNavigate} from "react-router";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import styles from "../styles/SignIn.module.css";
import {useMutation} from "@tanstack/react-query";
import {authQueries} from "../hooks/mutations/auth.ts";
import {HTTPError} from "ky";

export type SignUpInputs = {
    username: string;
    email: string;
    password: string;
}

function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
    } = useForm<SignUpInputs>({
        shouldFocusError: false,
    });

    const {mutate, isPending} = useMutation({
        ...authQueries.signUp(),
        onSuccess: () => {
            navigate("/home");
        },
        onError: async (error) => {
            if (error instanceof HTTPError) {
                const message = await error.response.text();
                setErrorMessage(message);
            } else {
                setErrorMessage("Une erreur est survenue, réessayez plus tard");
            }
        }
    });

    const onSubmit: SubmitHandler<SignUpInputs> = async (data: SignUpInputs) => {
        mutate(data);
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.wrap}>
                    <div className={styles.mainContainer}>
                        <h1 className={styles.title}>Inscription</h1>
                        <div className={styles.form}>
                            {errorMessage && <div className={styles.errorContainer}><p>{errorMessage}</p></div>}
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                <input type="text" placeholder="nom d'utilisateur"
                                       autoComplete="username"
                                       className={styles.input} {...register("username", {required: true})}/>
                                <input type="email" placeholder="adresse mail"
                                       autoComplete="email"
                                       className={styles.input} {...register("email", {required: true})}/>
                                <input type="password" placeholder="mot de passe"
                                       autoComplete="current-password"
                                       className={styles.input} {...register("password", {required: true})}/>
                                <input type="submit" value="S'inscrire" className={styles.submitBtn} disabled={isPending}/>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp;