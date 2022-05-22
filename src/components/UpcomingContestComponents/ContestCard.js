import React from "react";
import styles from "../../styles/upcoming_contests/ContestCard.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ContestCard = (props) => {
    return (
        <div className={styles.card_container}>
            <div className={styles.card_items}>
                <a className={styles.contest_link}>
                    <div className={styles.contest_icon}>
                        {props.platform === "Codeforces" ? (
                            <h4>codeforces</h4>
                        ) : props.platform === "Codechef" ? (
                            <h4>codechef</h4>
                        ) : (
                            <h4>atcoder</h4>
                        )}
                        {/* <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"> */}
                    </div>
                    LU MU Collaborate Team Contest 01
                </a>
                <span className={styles.starting_time}>17 march 8.35 PM</span>
                <span className={styles.duration}>3 Hour</span>
                <div className={styles.deleteBtn}>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;
