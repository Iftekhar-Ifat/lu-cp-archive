import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { processCFdata } from "../../../../components/ProcessCFdata";
import DynamicCFproblems from "../../../../components/DynamicCFproblems";
import Header from "../../../../components/Header";
import { LinearProgress } from "@mui/material";

const CFladderProblems = () => {
    const [problems, setProblems] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userCFhandle, setUserCFhandle] = useState();
    const path = useParams();

    const currentUserEmail = localStorage.getItem("email");

    let userStatus;
    let CFhandle;

    console.count("counter");
    //getting user data
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
    }, [path.ladder]);

    //getting cf problems from database
    useEffect(() => {
        const getCFProblems = async () => {
            try {
                const response = await fetch(
                    `https://hidden-garden-59705.herokuapp.com/codeforces-problems/${path.ladder}`
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setProblems(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getCFProblems())();
    }, [path.ladder]);

    userData.forEach((usrDta) => {
        const userEmail = usrDta.email;
        if (currentUserEmail === userEmail) {
            userStatus = usrDta.role;
            CFhandle = usrDta.CFhandle;
        }
    });

    //getting user's CF data
    const [fetchedCFdata, setFetchedCFdata] = useState();
    useEffect(() => {
        const fetchCFdata = async () => {
            const response = await fetch(
                `https://codeforces.com/api/user.status?handle=${CFhandle}`
            );
            const newData = await response.json();
            setFetchedCFdata(newData);
        };
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
            {userData && problems ? (
                <DynamicCFproblems
                    userCFhandle={CFhandle}
                    userCFhandleChange={setUserCFhandle}
                    problems={problems}
                    userStatus={userStatus}
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

export default CFladderProblems;
