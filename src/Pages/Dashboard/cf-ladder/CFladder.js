import React from "react";
import Header from "../../../components/Header";
import ProblemCard from "../../../components/ProblemCard";
import styles from "../../../styles/components/TopicWiseDynamic.module.css";

const CFladder = () => {
    const path = window.location.pathname;
    //console.log(path);
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
                        style={{ width: "100%", padding: "5%" }}
                    >
                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"800"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"900"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1000"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1100"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1200"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1300"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1400"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1500"}
                            solvedPercentage={0}
                        />

                        <ProblemCard
                            cardPath={path}
                            cardSize={70}
                            cardTitle={"1600"}
                            solvedPercentage={0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CFladder;
