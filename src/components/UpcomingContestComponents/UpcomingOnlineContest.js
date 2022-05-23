import React from "react";
import styles from "../../styles/upcoming_contests/FeaturedContest.module.css";
import ContestCard from "./ContestCard";
import moment from "moment";
import "moment-timezone";

const UpcomingOnlineContest = (props) => {
    // codeforcesContests.map((contest) =>
    //     console.log(
    //         moment
    //             .tz(`${contest.start_time}`, "Asia/Dhaka")
    //             .format("Do MMM YY, h:mm a")
    //     )
    // );
    //console.log(typeof props.contest);
    // props.contest = props.contest.filter((item) => {
    //     return item.in_24_hours !== "Yes";
    // });

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
                        Upcoming Online Contest
                    </h1>
                </div>
                <div className={styles.title_bar}>
                    <span style={{ width: "40%" }}>Contest</span>
                    <span style={{ width: "30%" }}>Starting Time</span>
                    <span style={{ width: "20%" }}>Duration</span>
                </div>
                {props.allContests.length ? (
                    <div className={styles.card_section}>
                        {props.allContests.map((contest) => (
                            <ContestCard
                                key={contest.url}
                                contest={contest}
                                platform={contest.platform}
                            />
                        ))}
                    </div>
                ) : null}
                {/* {codechefContests.length ? (
                    <div className={styles.card_section}>
                        {codechefContests.map((CCcontest) => (
                            <ContestCard
                                key={CCcontest.url}
                                contest={CCcontest}
                                platform="Codechef"
                            />
                        ))}
                    </div>
                ) : null}
                {atcoderContests.length ? (
                    <div className={styles.card_section}>
                        {atcoderContests.map((ACcontest) => (
                            <ContestCard
                                key={ACcontest.url}
                                contest={ACcontest}
                                platform="Atcoder"
                            />
                        ))}
                    </div>
                ) : null} */}
            </div>
        </div>
    );
};

export default UpcomingOnlineContest;
