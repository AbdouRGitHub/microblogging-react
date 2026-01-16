import {useNavigate} from "react-router";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import styles from "../styles/SignIn.module.css";
import {signUp} from "../services/user.service.ts";

function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    type Inputs = {
        username: string;
        email: string;
        password: string;
    }
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>({
        shouldFocusError: false,
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const result = await signUp(data.username, data.email, data.password);

        if (result.success) {
            navigate("/home");
        } else {
            setError(result.message ?? "Erreur inconnue");
        }
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.wrap}>
                    <div className={styles.mainContainer}>
                        <h1 className={styles.title}>Inscription</h1>
                        <div className={styles.form}>
                            {error && <div className={styles.errorContainer}><p>{error}</p></div>}
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                <input type="text" placeholder="pseudo"
                                       autoComplete="username"
                                       className={styles.input} {...register("username", {required: true})}/>
                                <input type="email" placeholder="adresse mail"
                                       autoComplete="email"
                                       className={styles.input} {...register("email", {required: true})}/>
                                <input type="password" placeholder="mot de passe"
                                       autoComplete="current-password"
                                       className={styles.input} {...register("password", {required: true})}/>
                                <input type="submit" value="S'inscrire" className={styles.submitBtn}/>
                            </form>
                        </div>
                    </div>
                    <p> Un projet par <a href="https://github.com/AbdouRGitHub"> AbdouRGitHub</a></p>
                </div>
            </main>
        </>
    )
}

export default SignUp;