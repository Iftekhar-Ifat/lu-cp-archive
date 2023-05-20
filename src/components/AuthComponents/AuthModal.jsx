import React, { useState } from 'react';
import styles from '../../styles/components/AuthModal.module.css';
import { Modal, Spacer } from '@geist-ui/core';
import { userInputHandler } from '../ApiComponents/handleUserInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider.jsx';

const AuthModal = ({ modalStatus, setModalStatus }) => {
    const { signInWithGoogle } = useAuth();
    const modalToggle = () => {
        setModalStatus(false);
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const signInHnadler = async () => {
        setLoading(true);
        try {
            await signInWithGoogle()
                .then(result => {
                    const userData = {
                        name: result.user.displayName,
                        email: result.user.email,
                        role: 'standard',
                        CFhandle: '',
                        status: {
                            solving: [],
                            solved: [],
                            reviewing: [],
                            skipped: [],
                        },
                    };
                    userInputHandler(userData);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (err) {
            console.log(err.message);
        }
        setLoading(false);
        setModalStatus(false);
        navigate('/dashboard');
    };

    return (
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
                    disabled={loading}
                >
                    Sign in with Google
                </button>
            </div>
        </Modal>
    );
};

export default AuthModal;
