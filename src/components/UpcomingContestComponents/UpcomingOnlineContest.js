import React from "react";
import styles from "../../styles/upcoming_contests/FeaturedContest.module.css";
import ContestCard from "./ContestCard";
import moment from "moment";
import "moment-timezone";

const UpcomingOnlineContest = ({
    codeforcesContests,
    atcoderContests,
    codechefContests,
}) => {
    // codeforcesContests.map((contest) =>
    //     console.log(
    //         moment
    //             .tz(`${contest.start_time}`, "Asia/Dhaka")
    //             .format("Do MMM YY, h:mm a")
    //     )
    // );

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
                {codeforcesContests?.length ? (
                    <div className={styles.card_section}>
                        {codeforcesContests.map((CFcontest) => (
                            <ContestCard
                                key={CFcontest.url}
                                contest={CFcontest}
                                platform="Codeforces"
                                // atcoderContests={atcoderContests}
                                // codechefContests={codechefContests}
                            />
                        ))}
                        {codechefContests.map((CCcontest) => (
                            <ContestCard
                                key={CCcontest.url}
                                contest={CCcontest}
                                platform="Codechef"
                                // atcoderContests={atcoderContests}
                                // codechefContests={codechefContests}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default UpcomingOnlineContest;
