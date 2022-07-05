import React, { useState } from "react";
import styles from "../../styles/Homepage/homepage.module.css";
import { Button } from "@geist-ui/core";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/AuthComponents/AuthModal";

const Homepage = () => {
    const user = localStorage.getItem("email");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const loadDashboardHandler = () => {
        if (user) {
            navigate("/dashboard");
        } else {
            setShowModal(true);
        }
    };

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Header />
            <div className={styles.background}>
                <div className={styles.background_container}>
                    <div className={styles.title}>
                        Leading University Competitive Programming Archive
                    </div>
                    <div className={styles.sub_title}>
                        {`< Learn > / < Practice >`}
                        <br></br>
                        <b>{`Have fun`}</b>
                    </div>
                    <div className={styles.button_div}>
                        <Button
                            type="secondary"
                            ghost
                            auto
                            scale={2.5}
                            onClick={loadDashboardHandler}
                        >
                            Get Started
                        </Button>
                        {showModal ? (
                            <AuthModal
                                modalStatus={showModal}
                                setModalStatus={setShowModal}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <a
                    style={{ color: "#c8c8c8" }}
                    href="https://github.com/Iftekhar-Ifat/lu-cp-archive"
                >
                    © IFTEKHAR
                </a>
            </footer>
        </div>
    );
};

export default Homepage;
