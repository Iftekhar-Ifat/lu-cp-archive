import React, { useState } from 'react';
import styles from '../styles/components/Header.module.css';
import { Button } from '@geist-ui/core';
import SignOutModal from './AuthComponents/SignOutModal';
import AuthModal from './AuthComponents/AuthModal';
import { Avatar } from '@mui/material';
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const user = useAuth();

    const [signOutTriggerd, setSignOutTriggerd] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const gotoProfile = () => {
        if (location.pathname !== '/profile') {
            navigate('/profile');
        }
    };

    return (
            <header className={styles.header}>
                <div className={styles.header_container}>
                    <div className={styles.logo_container}>
                        <div className="logo-btn">
                            <a href="/">
                                <div style={{ cursor: 'pointer' }}>
                                    <img
                                        src="/images/Homepage/logo.png"
                                        alt="logo"
                                        width={60}
                                        height={67}
                                    ></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    {user.currentUser !== null ? (
                        <div className={styles.auth_container}>
                            <div className={styles.logout_btn}>
                                <Button
                                    type="secondary"
                                    ghost
                                    auto
                                    onClick={() => {
                                        setSignOutTriggerd(true);
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                            <div
                                className={styles.signIn_btn}
                                onClick={gotoProfile}
                            >
                                <Avatar
                                    src={user.currentUser.photoURL}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.auth_container}>
                            <div className={styles.signIn_btn}>
                                <Button
                                    type="secondary"
                                    ghost
                                    auto
                                    onClick={() => {
                                        setShowSignInModal(true);
                                    }}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    )}
                    {signOutTriggerd ? (
                        <SignOutModal
                            signOutTriggerStatus={signOutTriggerd}
                            signOutTriggerStatusChange={setSignOutTriggerd}
                        />
                    ) : null}
                    {showSignInModal ? (
                        <AuthModal
                            modalStatus={showSignInModal}
                            setModalStatus={setShowSignInModal}
                        />
                    ) : null}
                </div>
            </header>
    );
};

export default Header;
