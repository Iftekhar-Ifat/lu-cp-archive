import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProblemCard from "./ProblemCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/components/TopicWiseDynamic.module.css";
import AddCFproblemModal from "./AddForms/AddCFproblemModal";

const DynamicCFproblems = (props) => {
    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);

    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };
    return (
        <div>
            <Header
                userCFhandle={props.userCFhandle}
                userCFhandleChange={props.userCFhandleChange}
            />
            <div
                className={styles.container}
                style={{ paddingLeft: "20%", paddingRight: "20%" }}
            >
                <div className={styles.wrapper}>
                    <div
                        className={styles.problem_section}
                        style={{ width: "100%", padding: "5%" }}
                    >
                        {props.problems.map((problem) => (
                            <ProblemCard
                                key={problem._id}
                                cardSize={50}
                                problemTitle={problem.title}
                                solvedPercentage={100}
                                problemUrl={problem.url}
                                verdict={problem.verdict}
                            />
                        ))}
                        {props.userStatus === "power" ? (
                            <div className={styles.add_btn}>
                                <Fab
                                    size="medium"
                                    color="secondary"
                                    aria-label="add"
                                    style={{ background: "#2E2F31" }}
                                    onClick={addProblemHandler}
                                >
                                    <AddIcon />
                                </Fab>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {addProblemToggle ? (
                <AddCFproblemModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default DynamicCFproblems;
