import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { processCFdata } from "../../../../components/ProcessCFdata";
import DynamicCFproblems from "../../../../components/DynamicCFproblems";
import Header from "../../../../components/Header";
import { LinearProgress, Stack } from "@mui/material";
import axios from "axios";

const CFladderProblems = () => {
    const [problems, setProblems] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userCFhandle, setUserCFhandle] = useState();
    const path = useParams();

    const currentUserEmail = localStorage.getItem("email");

    let userStatus;
    let CFhandle;

    //getting user data
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

    //getting cf problems from database
    const getCFProblems = async () => {
        try {
            axios
                .get(
                    `https://hidden-garden-59705.herokuapp.com/codeforces-problems/${path.ladder}`
                )
                .then((response) => {
                    setProblems(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    userData.forEach((usrDta) => {
        const userEmail = usrDta.email;
        if (currentUserEmail === userEmail) {
            userStatus = usrDta.role;
            CFhandle = usrDta.CFhandle;
        }
    });

    useEffect(() => {
        (async () => {
            const getUserFunction = getUserData();
            const getCFProblemsFunction = getCFProblems();
            return Promise.all([getUserFunction, getCFProblemsFunction]);
        })();
    }, [path.ladder]);

    //getting user's CF data
    const [fetchedCFdata, setFetchedCFdata] = useState();

    const fetchCFdata = async () => {
        axios
            .get(`https://codeforces.com/api/user.status?handle=${CFhandle}`)
            .then((response) => {
                setFetchedCFdata(response.data);
            });
    };

    useEffect(() => {
        fetchCFdata();
    }, [CFhandle]);

    if (CFhandle) {
        processCFdata(fetchedCFdata, problems);
    }

    // when new handle added
    useEffect(() => {
        if (userCFhandle) {
            fetch(
                `https://codeforces.com/api/user.info?handles=${userCFhandle}`
            )
                .then((response) => {
                    if (!response.ok) {
                        throw Error("Could not fetch the user info! ❗");
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    processCFdata(data, problems);
                    alert(
                        `${data.result[0].handle} handle successfully added! ✅. Reload to see the changes`
                    );
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [problems, userCFhandle]);

    return (
        <Fragment>
            {userData.length && problems.length ? (
                <DynamicCFproblems
                    userCFhandle={CFhandle}
                    userCFhandleChange={setUserCFhandle}
                    problems={problems}
                    userStatus={userStatus}
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

export default CFladderProblems;
