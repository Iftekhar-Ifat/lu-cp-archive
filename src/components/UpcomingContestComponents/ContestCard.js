import React, { Fragment } from "react";
import styles from "../../styles/upcoming_contests/ContestCard.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Countdown from "react-countdown";

const ContestCard = (props) => {
    return (
        <Fragment>
            {props.contest ? (
                <div className={styles.card_container}>
                    <div className={styles.card_items}>
                        <a
                            className={styles.contest_link}
                            href={`${props.contest.url}`}
                        >
                            <div className={styles.contest_icon}>
                                {props.contest.platform === "Codeforces" ? (
                                    <img
                                        src="../images/icons/codeforces_icon.png"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : props.contest.platform === "Codechef" ? (
                                    <img
                                        src="../images/icons/codechef_icon.png"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="../images/icons/atcoder_icon.png"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                )}
                            </div>
                            {props.contest.name}
                        </a>
                        <span className={styles.starting_time}>
                            {moment
                                .tz(`${props.contest.start_time}`, "Asia/Dhaka")
                                .format("Do MMM, h:mm a")}
                        </span>
                        <span className={styles.duration}>
                            {moment
                                .utc(
                                    moment
                                        .duration(
                                            `${props.contest.duration}`,
                                            "seconds"
                                        )
                                        .asMilliseconds()
                                )
                                .format("HH:mm")}{" "}
                            hr
                        </span>
                        <div className={styles.time_left}>
                            <Countdown
                                date={
                                    Date.now() +
                                    (moment
                                        .utc(`${props.contest.start_time}`)
                                        .valueOf() -
                                        Date.now())
                                }
                                daysInHours={true}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default ContestCard;
