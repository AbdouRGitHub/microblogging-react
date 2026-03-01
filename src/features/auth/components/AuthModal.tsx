import styles from "../styles/AuthModal.module.css";
import {X} from "lucide-react";
import {createPortal} from "react-dom";
import {useAuthModalStore} from "../stores/authModalStore.ts";
import {useEffect} from "react";
import {NavLink} from "react-router";

function AuthModal() {
    const {isOpen, close} = useAuthModalStore();

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close]);

    if (!isOpen) return null;

    return createPortal((
            <>
                <div className={styles.overlay} onClick={close}>
                    <div className={styles.modal}>
                        <div className={styles.closeContainer} onClick={close}>
                            <X/>
                        </div>
                        <h3 className={styles.text}>
                            Connectez-vous ou créez votre compte pour participer à la conversation !
                        </h3>
                        <div className={styles.btnContainer}>
                            <button className={styles.signUpBtn}>
                                <NavLink to="signUp" className={styles.link}>Créer un compte </NavLink>
                            </button>
                            <button className={styles.signInBtn}>
                                <NavLink to="" className={styles.link}>Connexion</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </>),
        document.body
    );
}


export default AuthModal;