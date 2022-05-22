import React from "react";
import styles from "../../styles/upcoming_contests/FeaturedContest.module.css";
import ContestCard from "./ContestCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const FeatureContests = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1
                        style={{
                            color: "white",
                            borderBottom: "3px solid white",
                        }}
                    >
                        Featured Contest
                    </h1>
                </div>
                <div className={styles.title_bar}>
                    <span style={{ width: "40%" }}>Contest</span>
                    <span style={{ width: "30%" }}>Starting Time</span>
                    <span style={{ width: "20%" }}>Duration</span>
                </div>
                <div className={styles.card_section}>
                    <ContestCard />
                </div>
            </div>
            <div className={styles.add_btn}>
                <Fab
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    style={{
                        background: "#2E2F31",
                        zIndex: 0,
                    }}
                    //onClick={addProblemHandler}
                >
                    <AddIcon />
                </Fab>
            </div>
        </div>
    );
};

export default FeatureContests;
