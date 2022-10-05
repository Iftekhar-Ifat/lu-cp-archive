import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { processCFdata } from "../../../../components/ProcessCFdata";
import DynamicCFproblems from "../../../../components/DynamicCFproblems";
import Header from "../../../../components/Header";
import { LinearProgress, Stack } from "@mui/material";
import axios from "axios";
import ColdStartNotification from "../../../../components/ColdStartNotification";

const CFladderProblems = () => {
    const [problems, setProblems] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userCFhandle, setUserCFhandle] = useState();
    const [isCFonline, setIsCFonline] = useState(false);
    const path = useParams();

    const currentUserEmail = localStorage.getItem("email");

    let userStatus;
    let CFhandle;

    //getting user data
    const getUserData = async () => {
        try {
            axios
                .get("https://lu-cp-archive-backend.onrender.com/users")
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
                    `https://lu-cp-archive-backend.onrender.com/codeforces-problems/${path.ladder}`
                )
                .then((response) => {
                    setProblems(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    //checking whether codeforces is online or not
    const getCodeforcesStatus = async () => {
        try {
            axios
                .get(
                    `https://codeforces.com/api/user.status?handle=Fefer_Ivan&from=1&count=10`
                )
                .then((response) => {
                    if (response.data.status === "OK") {
                        setIsCFonline(true);
                    }
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
            const isCFonline = getCodeforcesStatus();
            return Promise.all([
                getUserFunction,
                getCFProblemsFunction,
                isCFonline,
            ]);
        })();
    }, [path.ladder]);

    //getting user's CF data
    const [fetchedCFdata, setFetchedCFdata] = useState();

    const fetchCFdata = async () => {
        try {
            axios
                .get(
                    `https://codeforces.com/api/user.status?handle=${CFhandle}`
                )
                .then((response) => {
                    setFetchedCFdata(response.data);
                });
        } catch (err) {
            console.log("codeforces down");
        }
    };

    useEffect(() => {
        fetchCFdata();
    }, [CFhandle]);

    if (CFhandle && fetchedCFdata && isCFonline) {
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
                    localStorage.clear();
                    localStorage.setItem("cf-handle", data.result[0].handle);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [problems, userCFhandle]);

    return (
        <Fragment>
            {userData.length ? (
                <DynamicCFproblems
                    userCFhandle={CFhandle}
                    userCFhandleChange={setUserCFhandle}
                    problems={problems}
                    userStatus={userStatus}
                />
            ) : (
                <Fragment>
                    <Header />
                    <>
                        <Stack sx={{ width: "100%", color: "grey.500" }}>
                            <LinearProgress color="inherit" />
                        </Stack>
                        <ColdStartNotification />
                    </>
                </Fragment>
            )}
        </Fragment>
    );
};

export default CFladderProblems;
