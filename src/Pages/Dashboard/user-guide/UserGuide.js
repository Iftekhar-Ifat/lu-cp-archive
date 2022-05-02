import React from "react";
import Header from "../../../components/Header";
import styles from "../../../styles/UserGuide/UserGuide.module.css";
import InfoIcon from "@mui/icons-material/Info";

const UserGuide = () => {
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
                        <div className={styles.header_div}>
                            <h1 className={styles.header_style}>
                                <u>
                                    Welcome to LU Competitive Programming
                                    Archive
                                </u>
                            </h1>
                        </div>
                        <div className={styles.contents}>
                            <div
                                style={{ color: "white", fontFamily: "Inter" }}
                            >
                                <h2>
                                    Here is a quick guide to utilize this site
                                    properly :
                                </h2>
                                <div className={styles.guide_title}>
                                    <h2>Topic Wise Problem Tracker</h2>
                                </div>
                                <div className={styles.img_container}>
                                    <img
                                        alt="user_guide_img1"
                                        src="/images/UserGuide/user_guide_1.png"
                                    ></img>
                                </div>
                                <ol>
                                    <li>
                                        The colored circle indicates the problem
                                        status.{" "}
                                        <font style={{ color: "#FF6400" }}>
                                            Orange{" "}
                                        </font>
                                        implies it is under the process of you
                                        <b> solving</b> it.{" "}
                                        <font style={{ color: "#00ff00" }}>
                                            Green
                                        </font>{" "}
                                        means the problem has been <b>solved</b>
                                        .{" "}
                                        <font style={{ color: "#c000ff" }}>
                                            Purple
                                        </font>{" "}
                                        indicates you are <b>reviewing</b> the
                                        problem at hand. Lastly,{" "}
                                        <font style={{ color: "#ff0000" }}>
                                            red
                                        </font>{" "}
                                        suggests that you've <b>skipped</b> the
                                        problem.
                                    </li>
                                    <li>
                                        If there is any problem you want the
                                        status to be changed, just click on the
                                        circle and a menu will pop up. From here
                                        you can change the problem status
                                        manually. It is a handy feature to keep
                                        track of the problems you solve.
                                    </li>
                                    <li>
                                        The problem difficulty is shown here
                                        along with the tags. To see what
                                        category any particular problem belongs
                                        to, just hover your mouse on the{" "}
                                        <InfoIcon />.
                                    </li>
                                </ol>
                                <div className={styles.guide_title}>
                                    <h2>Add Codeforces Handle</h2>
                                </div>
                                <div className={styles.img_container}>
                                    <img
                                        alt="user_guide_img2"
                                        src="/images/UserGuide/user_guide_2.png"
                                    ></img>
                                </div>
                                <li>
                                    This is where you can add your codeforces
                                    handle. LUCA will then sync the problems
                                    you've solved in codeforces with its own.
                                    Adding codeforces handle will save you the
                                    trouble of manually setting the problem
                                    statuses for every problem.
                                    <div className={styles.img_container}>
                                        <img
                                            alt="user_guide_img3"
                                            src="/images/UserGuide/user_guide_3.png"
                                        ></img>
                                    </div>
                                    If there's any problem you've solved in
                                    codeforces, the problem will become green on
                                    LUCA as well; which indicates the problem
                                    status is “solved”.
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserGuide;
