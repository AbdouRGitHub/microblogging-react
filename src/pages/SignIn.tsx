import styles from "../styles/SignIn.module.css";
import {useForm, type SubmitHandler} from "react-hook-form";

function SignIn() {
    type Inputs = {
        username: string;
        password: string;
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({
        mode: "onChange",
        shouldFocusError: false
    });
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data)
    return (
        <>
            <main className={styles.main}>
                <div className={styles.wrap}>
                    <div className={styles.mainContainer}>
                        <h1 className={styles.title}>Connexion</h1>
                        <div className={styles.form}>
                            <form onClick={handleSubmit(onSubmit)} className={styles.form}>
                                <input type="text" placeholder="pseudo"
                                       autoComplete="username"
                                       className={styles.input} {...register("username", {required: true})}/>
                                <input type="password" placeholder="mot de passe"
                                       autoComplete="current-password"
                                       className={styles.input} {...register("password", {required: true})}/>
                                <input type="submit" value="Se connecter" className={styles.submitBtn}/>
                            </form>
                        </div>
                    </div>
                    <p> Un projet par <a href="https://github.com/AbdouRGitHub"> AbdouRGitHub</a></p>
                </div>
            </main>
        </>
    )
}

export default SignIn;