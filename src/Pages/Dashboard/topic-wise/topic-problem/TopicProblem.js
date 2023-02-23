import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { processData } from "../../../../components/TopicWiseComponents/processDataHandler";
import styles from "../../../../styles/components/TopicWiseDynamic.module.css";
import { Fab, LinearProgress, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useAuth } from "../../../../context/AuthProvider";
import Resources from "../../../../components/Resources";
import ProblemCard from "../../../../components/TopicWiseComponents/ProblemCard";
import AddProblemModal from "../../../../components/AddForms/AddProblemModal";
import ProgressBarCard from "../../../../components/TopicWiseComponents/ProgressBarCard";

const TopicProblem = () => {
    //getting route
    let problemRoute = useParams();

    //getting user
    const currentUserEmail = useAuth().currentUser.email;

    const [userData, setUserData] = useState([]);
    const [problems, setProblems] = useState([]);
    const [resources, setResources] = useState([]);
    const [problemStatus, setProblemStatus] = useState();
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const [userProblemStatus, setUserProblemStatus] = useState();

    // add problem
    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);
    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };

    useEffect(() => {
        setLoading(true);
        //getting problems
        const getProblems = async () => {
            try {
                axios
                    .get(
                        `https://lu-cp-archive-backend.onrender.com/topicProblems/${problemRoute.topicProblems}`
                    )
                    .then((response) => {
                        setProblems(response.data);
                    });
            } catch (err) {
                console.log(err.message);
            }
        };

        //getting resources
        const getResources = async () => {
            try {
                axios
                    .get(
                        `https://lu-cp-archive-backend.onrender.com/resources/${problemRoute.topicProblems}`
                    )
                    .then((response) => {
                        setResources(response.data);
                    });
            } catch (err) {
                console.log(err.message);
            }
        };

        //getting user Data
        const getUserData = async () => {
            try {
                axios
                    .get("https://lu-cp-archive-backend.onrender.com/users", {
                        params: { currentUserEmail: currentUserEmail },
                    })
                    .then((response) => {
                        setUserData(response.data);
                    });
            } catch (err) {
                console.log(err.message);
            }
        };

        //getting tags
        const getTags = async () => {
            try {
                axios
                    .get(`https://lu-cp-archive-backend.onrender.com/all-tags`)
                    .then((response) => {
                        setAllTags(response.data[0].tags);
                    });
            } catch (err) {
                console.log(err.message);
            }
        };

        Promise.all([getProblems(), getResources(), getUserData(), getTags()]);
        setLoading(false);
    }, [currentUserEmail, problemRoute.topicProblems]);

    useEffect(() => {
        if (userData && problems) {
            processData(userData, problems)
                .then((processedData) => {
                    setUserProblemStatus(processedData);
                })
                .catch((error) => console.error(error));
        }
    }, [userData, problems]);

    //updating problem state
    useEffect(() => {
        try {
            axios.post(
                "https://lu-cp-archive-backend.onrender.com/update-problem-status",
                {
                    ...problemStatus,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }, [problemStatus]);

    return (
        <Fragment>
            {loading ? (
                <Stack sx={{ width: "100%", color: "grey.500" }}>
                    <LinearProgress color="inherit" />
                </Stack>
            ) : (
                <div>
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <div className={styles.problem_section}>
                                <div className={styles.problem_section_header}>
                                    <div className={styles.status}>Status</div>
                                    <div className={styles.title_div}>
                                        Title
                                    </div>
                                    <div className={styles.difficulty}>
                                        Difficulty
                                    </div>
                                </div>
                                {problems.map((problem) => (
                                    <ProblemCard
                                        key={problem._id}
                                        title={problem.title}
                                        url={problem.url}
                                        difficulty={problem.difficulty}
                                        role={userData.role}
                                        problemStatusChange={setProblemStatus}
                                        statusColor={problem.color}
                                        tags={problem.tags}
                                    />
                                ))}
                                {userData.role === "power" ? (
                                    <div className={styles.add_btn}>
                                        <Fab
                                            size="medium"
                                            color="secondary"
                                            aria-label="add"
                                            style={{
                                                background: "#2E2F31",
                                                zIndex: 0,
                                            }}
                                            onClick={addProblemHandler}
                                        >
                                            <AddIcon />
                                        </Fab>
                                    </div>
                                ) : null}
                            </div>
                            <div className={styles.sidebar_container}>
                                {userProblemStatus ? (
                                    <ProgressBarCard
                                        userProblems={userProblemStatus}
                                        allProblems={problems}
                                    />
                                ) : (
                                    <Stack
                                        sx={{
                                            width: "100%",
                                            color: "grey.500",
                                        }}
                                    >
                                        <LinearProgress color="inherit" />
                                    </Stack>
                                )}

                                <Resources
                                    key={resources._id}
                                    userRole={userData.role}
                                    resources={resources}
                                />
                            </div>
                        </div>
                    </div>
                    {addProblemToggle ? (
                        <AddProblemModal
                            show={show}
                            setShow={setShow}
                            allTags={allTags}
                        />
                    ) : null}
                </div>
            )}
        </Fragment>
    );
};

export default TopicProblem;
