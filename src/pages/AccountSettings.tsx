import styles from "../styles/AccountSettings.module.css";
import {useForm} from "react-hook-form";
import {type QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {userQueries} from "../hooks/queries/user.ts";
import {useState} from "react";
import {userMutations} from "../hooks/mutations/user.ts";
import {HTTPError} from "ky";
import AlertMessage from "../components/AlertMessage.tsx";


export interface UserUpdateFormInputs {
    username?: string;
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
}

function AccountSettings() {
    const {data: user} = useQuery(userQueries.myDetails());
    const queryClient: QueryClient = useQueryClient();
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, dirtyFields}
    } = useForm<UserUpdateFormInputs>({
        shouldFocusError: false,
        mode: "onSubmit",
        values: {
            username: user ? user.username : "",
            email: user ? user.email : ""
        },
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    });

    const userMutation = useMutation({
        ...userMutations.update,
        onSuccess: async () => {
            await queryClient.invalidateQueries(userQueries.myDetails());
            setSuccess("Profil mis à jour");
        },
        onMutate: async (updateUserForm, context) => {
            await context.client.cancelQueries(userQueries.myDetails());
            const previousUser = context.client.getQueryData(userQueries.myDetails().queryKey);

            context.client.setQueryData(userQueries.myDetails().queryKey, (oldUserData) => {
                if (oldUserData) {
                    return {
                        ...oldUserData,
                        ...updateUserForm,
                    }
                }
            });
            return {previousUser};
        },
        onError: async (error, _updateUserForm, onMutateResult, context) => {
            if (onMutateResult?.previousUser) {
                context.client.setQueryData(userQueries.myDetails().queryKey, onMutateResult.previousUser);
            }
            if (error instanceof HTTPError) {
                const message = await error.response.text();
                setError(message);
            } else {
                setError("Une erreur est survenue, réessayez plus tard");
            }
        },
        onSettled: async (_data, _error, _variables, _onMutateResult, context) => {
            await context.client.cancelQueries(userQueries.myDetails());
        }
    });

    const onSubmit = async (data: UserUpdateFormInputs) => {
        setError(null);
        userMutation.mutate(data);
    };

    return (
        <>
            <div className={styles.content}>
                {(error && !success) && <AlertMessage type="error" message={error}/>}
                {(success && !error) && <AlertMessage type="success" message={success}/>}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input {...register("username", {minLength: 5, maxLength: 20})}
                           className={styles.settingsInput}/>
                    {
                        (errors.username?.type === "minLength" || errors.username?.type === "maxLength")
                        && <p className={styles.errorInputMessage}> Le nom d'utilisateur doit contenir entre 5 et 20
                            caractères</p>
                    }
                    {
                        dirtyFields.username && <input type="submit" className={styles.settingsSubmit}
                                                       value="Enregistrer le nom d'utilisateur"/>
                    }
                </form>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Adresse mail</label>
                    <input {...register("email")} className={styles.settingsInput}/>
                    {
                        dirtyFields.email &&
                        <input type="submit" className={styles.settingsSubmit} value="Enregisrer l'adresse mail"/>
                    }
                </form>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="password">Mot de passe</label>
                    <input placeholder="nouveau mot de passe" {...register("newPassword")}
                           className={styles.settingsInput}/>
                    <input placeholder="confirmez le nouveau mot de passe" {...register("confirmPassword")}
                           className={styles.settingsInput}/>
                    {
                        dirtyFields.confirmPassword && <input type="submit" className={styles.settingsSubmit}
                                                              value="Enregistrer le mot de passe"/>
                    }
                </form>
            </div>
        </>
    )
}


export default AccountSettings;