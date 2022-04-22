import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { processData } from "../../../../../components/processDataHandler";
import DynamicTopicItem from "../../../../../components/DynamicTopicItem";
import { LinearProgress } from "@mui/material";
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

    //getting problems
    useEffect(() => {
        const getProblems = async () => {
            try {
                const response = await fetch(
                    `https://hidden-garden-59705.herokuapp.com/topicProblems/${problemRoute.topicProblems}`
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setProblems(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getProblems())();
    }, [currentUserEmail]);

    //getting resources
    useEffect(() => {
        const getResources = async () => {
            try {
                const response = await fetch(
                    `https://hidden-garden-59705.herokuapp.com/resources/${problemRoute.topicProblems}`
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setResources(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getResources())();
    }, [currentUserEmail]);

    //getting user Data
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(
                    "https://hidden-garden-59705.herokuapp.com/users"
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getUserData())();
    }, [currentUserEmail]);

    //getting tags
    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await fetch(
                    `https://hidden-garden-59705.herokuapp.com/all-tags`
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setAllTags(data[0].tags);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getTags())();
    }, [currentUserEmail]);

    let userStatus;
    let userProblemStatus;
    userData &&
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
                        .then((res) =>
                            res.statusText !== "OK" ? alert(res) : null
                        );
                } catch (err) {
                    console.log(err.message);
                }
            };
            (async () => await updateProblemStatus())();
        }
    }, [problemStatus]);

    return (
        <Fragment>
            {userData && userProblemStatus ? (
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
                    <LinearProgress />
                </Fragment>
            )}
        </Fragment>
    );
};

export default TopicProblem;
