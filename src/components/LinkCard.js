import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/components/ProblemCard.module.css";

const LinkCard = (props) => {
    return (
        <a className={styles.problem_card_container} href={props.cardURL}>
            <div className={styles.card_container_large}>
                <div className={styles.card_wrapper}>
                    <div className={styles.card_title}>{props.cardTitle}</div>
                </div>
            </div>
        </a>
    );
};

export default LinkCard;
