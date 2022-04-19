import React, { useState } from "react";
import styles from "../../styles/components/AuthModal.module.css";
import { Modal, Spacer } from "@geist-ui/core";
import { signInWithGoogle } from "../../Auth/firebaseConfig";
import useAuth from "../../hooks/useAuth";
import { userInputHandler } from "../ApiComponents/handleUserInput";

const AuthModal = ({ modalStatus, setModalStatus }) => {
    const modalToggle = () => {
        setModalStatus(false);
    };

    const currentUser = useAuth();
    const [loading, setLoading] = useState(false);

    const signInHnadler = async () => {
        setLoading(true);
        try {
            await signInWithGoogle()
                .then((result) => {
                    const userData = {
                        name: result.user.displayName,
                        email: result.user.email,
                        role: "standard",
                        CFhandle: "",
                        status: {
                            solving: [],
                            solved: [],
                            reviewing: [],
                            skipped: [],
                        },
                    };
                    userInputHandler(userData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (err) {
            alert(err.message);
        }
        setLoading(false);
    };

    return (
        <div>
            {currentUser ? (
                <Modal visible={modalStatus} onClose={modalToggle}>
                    <Modal.Title>Login / Register</Modal.Title>
                    <Spacer />
                    <Modal.Subtitle>You are Logged in</Modal.Subtitle>
                    <Spacer />
                    <Spacer />
                    <div className={styles.button_container}>
                        <button
                            className={styles.login_with_google_btn}
                            onClick={signInHnadler}
                            disabled={true}
                        >
                            Sign in with Google
                        </button>
                    </div>
                </Modal>
            ) : (
                <Modal visible={modalStatus} onClose={modalToggle}>
                    <Modal.Title>Login / Register</Modal.Title>
                    <Spacer />
                    <Modal.Subtitle>
                        Sign in with your google account to track your progress
                    </Modal.Subtitle>
                    <Spacer />
                    <Spacer />
                    <div className={styles.button_container}>
                        <button
                            className={styles.login_with_google_btn}
                            onClick={signInHnadler}
                            disabled={loading || currentUser}
                        >
                            Sign in with Google
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AuthModal;
