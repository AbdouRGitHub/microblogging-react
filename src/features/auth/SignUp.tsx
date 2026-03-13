import {useNavigate} from "react-router";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import styles from "./styles/SignUp.module.css"
import {useMutation} from "@tanstack/react-query";
import {HTTPError} from "ky";
import {authQueries} from "./hooks/queries/auth.ts";
import Button from "../../shared/components/Button.tsx";
import SpinnerLoader from "../../shared/components/SpinnerLoader.tsx";
import Input from "../../shared/components/Input.tsx";

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
            navigate("/");
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
                                <Input type="text" placeholder="nom d'utilisateur"
                                       autoComplete="username" register={register("username", {required: true})}/>
                                <Input type="email" placeholder="adresse mail"
                                       autoComplete="email" register={register("email", {required: true})}/>
                                <Input type="password" placeholder="mot de passe"
                                       autoComplete="current-password"
                                       register={register("password", {required: true})}/>
                                <Button type="submit" className={styles.submitBtn}
                                        disabled={isPending}>
                                    {isPending ? <SpinnerLoader/> : "S'inscrire"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp;