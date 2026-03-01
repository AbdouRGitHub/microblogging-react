import styles from "./styles/AccountSettings.module.css";
import {useForm} from "react-hook-form";
import {type QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {userQueries} from "../user/hooks/queries/user.ts";
import {useState} from "react";
import {userMutations} from "../user/hooks/mutations/user.ts";
import {HTTPError} from "ky";
import AlertMessage from "../../shared/components/AlertMessage.tsx";


export interface UsernameFormData {
    username: string;
};

export interface EmailFormData {
    email: string;
};

export interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
};

function AccountSettings() {
    const {data: user} = useQuery(userQueries.myDetails());
    const queryClient: QueryClient = useQueryClient();
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const usernameForm = useForm<UsernameFormData>({
        shouldFocusError: false,
        mode: "onSubmit",
        values: {
            username: user ? user.username : "",
        }
    });

    const emailForm = useForm<EmailFormData>({
        shouldFocusError: false,
        mode: "onSubmit",
        values: {
            email: user ? user.email : ""
        }
    });

    const passwordForm = useForm<PasswordFormData>({
        shouldFocusError: false,
        mode: "onSubmit",
        defaultValues: {
            currentPassword: "",
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

    const onUsernameSubmit = async (data: UsernameFormData) => {
        setError(null);
        setSuccess(null);
        userMutation.mutate(data);
    };

    const onEmailSubmit = async (data: EmailFormData) => {
        setError(null);
        setSuccess(null);
        userMutation.mutate(data);
    };

    const onPasswordSubmit = async (data: PasswordFormData) => {
        setError(null);
        setSuccess(null);
        if (data.newPassword !== data.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
        } else {
            userMutation.mutate({currentPassword: data.currentPassword, newPassword: data.newPassword});
        }
    };

    return (
        <>
            <div className={styles.content}>
                {(error && !success) && <AlertMessage type="error" message={error}/>}
                {(success && !error) && <AlertMessage type="success" message={success}/>}
                <form className={styles.form} onSubmit={usernameForm.handleSubmit(onUsernameSubmit)}>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input {...usernameForm.register("username", {minLength: 5, maxLength: 20})}
                           className={styles.settingsInput}/>
                    {
                        (usernameForm.formState.errors.username?.type === "minLength" || usernameForm.formState.errors.username?.type === "maxLength")
                        && <p className={styles.errorInputMessage}> Le nom d'utilisateur doit contenir entre 5 et 20
                            caractères</p>
                    }
                    {
                        usernameForm.formState.isDirty && <input type="submit" className={styles.settingsSubmit}
                                                                 value="Enregistrer le nom d'utilisateur"/>
                    }
                </form>

                <form className={styles.form} onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                    <label htmlFor="email">Adresse mail</label>
                    <input {...emailForm.register("email")} className={styles.settingsInput}/>
                    {
                        emailForm.formState.isDirty &&
                        <input type="submit" className={styles.settingsSubmit} value="Enregisrer l'adresse mail"/>
                    }
                </form>

                <form className={styles.form} onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                           placeholder="mot de passe actuel" {...passwordForm.register("currentPassword")}
                           className={styles.settingsInput}/>
                    <input type="password" placeholder="nouveau mot de passe" {...passwordForm.register("newPassword")}
                           className={styles.settingsInput}/>
                    <input type="password"
                           placeholder="confirmez le nouveau mot de passe" {...passwordForm.register("confirmPassword")}
                           className={styles.settingsInput}/>
                    {
                        passwordForm.formState.isDirty
                        && <input type="submit" className={styles.settingsSubmit}
                                  value="Enregistrer le mot de passe"/>
                    }
                </form>
            </div>
        </>
    )
}


export default AccountSettings;