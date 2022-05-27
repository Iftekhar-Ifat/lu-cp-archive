import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { processData } from "../../../../../components/TopicWiseComponents/processDataHandler";
import DynamicTopicItem from "../../../../../components/TopicWiseComponents/DynamicTopicItem";
import { LinearProgress, Stack } from "@mui/material";
import Header from "../../../../../components/Header";
import axios from "axios";

const TopicProblem = () => {
    //getting route
    let problemRoute = useParams();

    //getting user
    const currentUserEmail = localStorage.getItem("email");

    const [userData, setUserData] = useState([]);
    const [problems, setProblems] = useState([]);
    const [resources, setResources] = useState([]);
    const [problemStatus, setProblemStatus] = useState("");
    const [firstRender, setFirstRender] = useState(true);
    const [allTags, setAllTags] = useState([]);

    let userStatus;
    let userProblemStatus;

    //getting problems
    const getProblems = async () => {
        try {
            axios
                .get(
                    `https://hidden-garden-59705.herokuapp.com/topicProblems/${problemRoute.topicProblems}`
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
                    `https://hidden-garden-59705.herokuapp.com/resources/${problemRoute.topicProblems}`
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
                .get("https://hidden-garden-59705.herokuapp.com/users")
                .then((response) => {
                    setUserData(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    // processing data
    if (userData) {
        userData?.forEach((usrDta) => {
            const userEmail = usrDta.email;
            if (currentUserEmail === userEmail) {
                userStatus = usrDta.role;
                userProblemStatus = processData(
                    usrDta,
                    problems,
                    userProblemStatus
                );
            }
        });
    }

    //getting tags
    const getTags = async () => {
        try {
            axios
                .get(`https://hidden-garden-59705.herokuapp.com/all-tags`)
                .then((response) => {
                    setAllTags(response.data[0].tags);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        (async () => {
            const getUserFunction = getUserData();
            const getProblemsFunction = getProblems();
            const getResourcesFunction = getResources();
            const getTagsFunction = getTags();
            return Promise.all([
                getUserFunction,
                getProblemsFunction,
                getResourcesFunction,
                getTagsFunction,
            ]);
        })();
    }, [currentUserEmail]);

    //updating problem state
    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
        }
        if (!firstRender) {
            const updateProblemStatus = async () => {
                try {
                    axios
                        .post(
                            "https://hidden-garden-59705.herokuapp.com/update-problem-status",
                            {
                                ...problemStatus,
                            }
                        )
                        .then((res) => {
                            getUserData();
                        });
                } catch (err) {
                    console.log(err.message);
                }
            };
            (async () => {
                await updateProblemStatus();
            })();
        }
    }, [problemStatus]);

    return (
        <Fragment>
            {userData.length && userProblemStatus ? (
                <DynamicTopicItem
                    problems={problems}
                    userRole={userStatus}
                    problemStatusChange={setProblemStatus}
                    resources={resources}
                    userProblems={userProblemStatus}
                    allTags={allTags}
                />
            ) : (
                <Fragment>
                    <Header />
                    <Stack sx={{ width: "100%", color: "grey.500" }}>
                        <LinearProgress color="inherit" />
                    </Stack>
                </Fragment>
            )}
        </Fragment>
    );
};

export default TopicProblem;
