import React from "react";
import styles from "../../styles/components/ProgressBarCard.module.css";
import { Code, Check, ChevronsLeft, X } from "@geist-ui/icons";
import { Progress } from "@geist-ui/core";
import Colors from "../../styles/colors";

const ProgressBarCard = ({ userProblems, allProblems }) => {
    let totalProblems = allProblems.length;
    //  progressbar color
    const orange = {
        100: Colors.orange,
    };
    const green = {
        100: Colors.green,
    };
    const red = {
        100: Colors.red,
    };
    const violet = {
        100: Colors.violet,
    };

    let solvingValue, solvedValue, reviewingValue, skippedValue;
    if (userProblems) {
        solvingValue = 100 * (userProblems.solving / totalProblems);
        solvedValue = 100 * (userProblems.solved / totalProblems);
        reviewingValue = 100 * (userProblems.reviewing / totalProblems);
        skippedValue = 100 * (userProblems.skipped / totalProblems);
    }

    return (
        <div className={styles.progressbar_div}>
            <div className={styles.progressbar_card}>
                <div className={styles.title_div}>
                    <Code size={28} color={`${Colors.orange}`} />
                    <div className={styles.text_title}>Solving</div>
                </div>
                <Progress value={solvingValue || "undefined"} colors={orange} />
                <div className={styles.title_div}>
                    <Check size={28} color={`${Colors.green}`} />
                    <div className={styles.text_title}>Solved</div>
                </div>
                <Progress value={solvedValue || "undefined"} colors={green} />
                <div className={styles.title_div}>
                    <ChevronsLeft size={28} color={`${Colors.violet}`} />
                    <div className={styles.text_title}>Reviewing</div>
                </div>
                <Progress
                    value={reviewingValue || "undefined"}
                    colors={violet}
                />
                <div className={styles.title_div}>
                    <X size={28} color={`${Colors.red}`} />
                    <div className={styles.text_title}>Skipped</div>
                </div>
                <Progress value={skippedValue || "undefined"} colors={red} />
            </div>
        </div>
    );
};

export default ProgressBarCard;
