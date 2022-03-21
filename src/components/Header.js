import React, { useEffect, useState } from "react";
import styles from "../styles/components/Header.module.css";
import { Button } from "@geist-ui/core";
import useAuth from "../hooks/useAuth";
import SignOutModal from "./AuthComponents/SignOutModal";
import AuthModal from "./AuthComponents/AuthModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
// import CFhandleModal from "./AddForms/CFhandleModal";

const Header = (props) => {
    const currentUser = useAuth();
    const [signOutTriggerd, setSignOutTriggerd] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showCfHandleModal, setShowCfHandleModal] = useState(false);
    const [userPhoto, setUserPhoto] = useState("");
    const [currentUserEmail, setCurrentUserEmail] = useState();

    // const { pathname } = useRouter();
    // const pathCheck = pathname.split("/")[3] === "[CFLabel]";

    const modalToggle = () => {
        setShowCfHandleModal(true);
    };
    useEffect(() => {
        let isMounted = true;
        if (currentUser?.photoURL) {
            setUserPhoto(currentUser.photoURL);
            setCurrentUserEmail(currentUser.email);
        }
        isMounted = false;
    }, [currentUser]);

    const signOutHandler = () => {
        setSignOutTriggerd(true);
    };

    const signInHandler = () => {
        setShowSignInModal(true);
    };

    const theme = createTheme({
        palette: {
            mode: "dark",
            neutral: {
                main: "#18181b",
                contrastText: "#fff",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <header className={styles.header}>
                <div className={styles.header_container}>
                    <div className={styles.logo_container}>
                        <div className="logo-btn">
                            <a href="/">
                                <div style={{ cursor: "pointer" }}>
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
                    {currentUser ? (
                        <div className={styles.auth_container}>
                            <div className={styles.logout_btn}>
                                <Button
                                    type="secondary"
                                    ghost
                                    auto
                                    onClick={signOutHandler}
                                >
                                    Sign Out
                                </Button>
                            </div>
                            <div
                                className={styles.signIn_btn}
                                onClick={modalToggle}
                            >
                                <Avatar
                                    src={userPhoto}
                                    style={{ cursor: "pointer" }}
                                />
                                {/* {showCfHandleModal && pathCheck ? (
                                    <CFhandleModal
                                        modalToggle={setShowCfHandleModal}
                                        userCFhandleChange={
                                            props.userCFhandleChange
                                        }
                                        userCFhandle={props.userCFhandle}
                                        currentUserEmail={currentUserEmail}
                                    />
                                ) : null} */}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.auth_container}>
                            <div className={styles.signIn_btn}>
                                <Button
                                    type="secondary"
                                    ghost
                                    auto
                                    onClick={signInHandler}
                                >
                                    Sign In
                                </Button>
                                {showSignInModal ? (
                                    <AuthModal
                                        modalStatus={showSignInModal}
                                        setModalStatus={setShowSignInModal}
                                    />
                                ) : null}
                            </div>
                        </div>
                    )}
                    {signOutTriggerd ? (
                        <SignOutModal
                            signOutTriggerStatus={signOutTriggerd}
                            signOutTriggerStatusChange={setSignOutTriggerd}
                        />
                    ) : null}
                </div>
            </header>
        </ThemeProvider>
    );
};

export default Header;
