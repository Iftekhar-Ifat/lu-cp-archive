import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { processCFdata } from "../../../../components/ProcessCFdata";
import DynamicCFproblems from "../../../../components/DynamicCFproblems";
import { LinearProgress, Stack } from "@mui/material";
import axios from "axios";
import ColdStartNotification from "../../../../components/ColdStartNotification";
import { useAuth } from "../../../../context/AuthProvider";

const CFladderProblems = () => {
    const [problems, setProblems] = useState([]);
    const [processedProblems, setProcessedProblems] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userCFhandle, setUserCFhandle] = useState();
    const [loading, setLoading] = useState(false);
    const path = useParams();

    const currentUserEmail = useAuth().currentUser.email;

    useEffect(() => {
        setLoading(true);
        //getting user data
        const getUserData = axios.get(
            "https://lu-cp-archive-backend.onrender.com/users",
            {
                params: { currentUserEmail: currentUserEmail },
            }
        );

        //getting cf problems from database
        const getCFProblems = axios.get(
            `https://lu-cp-archive-backend.onrender.com/codeforces-problems/${path.ladder}`
        );
        Promise.all([getUserData, getCFProblems]).then((response) => {
            setUserData(response[0].data);
            setProblems(response[1].data);
            setLoading(false);
        });
    }, [currentUserEmail, path.ladder]);

    useEffect(() => {
        if (userData) {
            //checking whether codeforces is online or not
            try {
                axios
                    .get(
                        `https://codeforces.com/api/user.status?handle=${userData.CFhandle}`
                    )
                    .then((response) => {
                        if (response.data.status === "OK") {
                            let cfDataWithVerdict = processCFdata(
                                response.data,
                                problems
                            );
                            setProcessedProblems(cfDataWithVerdict);
                        }
                    });
            } catch (err) {
                console.log(err.message);
            }
        }
    }, [problems, userData]);

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
                    alert(
                        `${data.result[0].handle} handle successfully added! ✅. Reload to see the changes`
                    );
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [userCFhandle]);

    return (
        <>
            {loading ? (
                <>
                    <Stack sx={{ width: "100%", color: "grey.500" }}>
                        <LinearProgress color="inherit" />
                    </Stack>
                    <ColdStartNotification />
                </>
            ) : (
                <DynamicCFproblems
                    userCFhandle={userData.CFhandle}
                    userCFhandleChange={setUserCFhandle}
                    problems={problems}
                    userStatus={userData.role}
                />
            )}
        </>
    );
};

export default CFladderProblems;
