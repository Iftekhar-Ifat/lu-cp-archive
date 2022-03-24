import React from "react";
import styles from "../styles/components/ProblemCard.module.css";

const LinkCard = (props) => {
    return (
        <a className={styles.problem_card_container} href={props.cardURL}>
            <div className={styles.card_container_large}>
                <div
                    className={styles.card_wrapper}
                    style={{ paddingLeft: "0%" }}
                >
                    <div className={styles.card_title}>{props.cardTitle}</div>
                </div>
            </div>
        </a>
    );
};

export default LinkCard;
