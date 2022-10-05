import React, { useState } from "react";
import styles from "../../styles/components/AuthModal.module.css";
import { Modal, Spacer } from "@geist-ui/core";
import { signInWithGoogle } from "../../Auth/firebaseConfig";
import useAuth from "../../hooks/useAuth";
import { userInputHandler } from "../ApiComponents/handleUserInput";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ modalStatus, setModalStatus }) => {
    const modalToggle = () => {
        setModalStatus(false);
    };

    const navigate = useNavigate();

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
                    const email = result.user.email;
                    const profilePic = result.user.photoURL;
                    localStorage.setItem("email", email);
                    localStorage.setItem("profilePic", profilePic);
                    userInputHandler(userData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (err) {
            console.log(err.message);
        }
        setLoading(false);
    };

    return (
        <div>
            {currentUser ? (
                navigate("/dashboard")
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
