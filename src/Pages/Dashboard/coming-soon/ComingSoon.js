import React from "react";
import Header from "../../../components/Header";
import styles from "../../../styles/components/TopicWiseDynamic.module.css";

const ComingSoon = () => {
    return (
        <div>
            <Header />
            <div
                className={styles.container}
                style={{ paddingLeft: "20%", paddingRight: "20%" }}
            >
                <div className={styles.wrapper}>
                    <div
                        className={styles.problem_section}
                        style={{ width: "100%" }}
                    >
                        <h1 style={{ color: "white" }}>Coming soon...</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
