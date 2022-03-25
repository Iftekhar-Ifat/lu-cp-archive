import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import { processData } from "../../../../../components/processDataHandler";
import DynamicTopicItem from "../../../../../components/DynamicTopicItem";
import { LinearProgress } from "@mui/material";
import Header from "../../../../../components/Header";
import axios from "axios";

const TopicProblem = () => {
    //getting route
    let problemRoute = useParams();

    //getting user
    const currentUser = useAuth();

    const [userData, setUserData] = useState([]);
    const [problems, setProblems] = useState([]);
    const [resources, setResources] = useState([]);
    const [problemStatus, setProblemStatus] = useState("");

    //getting user Data
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/users");
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getUserData())();
    }, []);

    //getting problems
    useEffect(() => {
        const getProblems = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/topicProblems/${problemRoute.topicProblems}`
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setProblems(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getProblems())();
    }, [problemRoute.topicProblems]);

    //getting resources
    useEffect(() => {
        const getResources = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/resources/${problemRoute.topicProblems}`
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setResources(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getResources())();
    }, [problemRoute.topicProblems]);

    let userStatus;
    let userProblemStatus;
    userData &&
        userData?.forEach((usrDta) => {
            const userEmail = usrDta.email;
            if (currentUser?.email === userEmail) {
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
        const updateProblemStatus = async () => {
            try {
                axios
                    .post("http://localhost:5000/update-problem-status", {
                        ...problemStatus,
                    })
                    .then((res) =>
                        res.statusText !== "OK" ? alert(res) : null
                    );
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await updateProblemStatus())();
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
