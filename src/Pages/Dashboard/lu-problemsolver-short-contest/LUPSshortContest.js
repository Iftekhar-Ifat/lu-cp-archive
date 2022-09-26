import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import LinkCard from "../../../components/LinkCard";
import useAuth from "../../../hooks/useAuth";
import styles from "../../../styles/components/TopicWiseDynamic.module.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddResourcesModal from "../../../components/AddForms/AddResourcesModal";
import { LinearProgress, Stack } from "@mui/material";

const LUPSshortContest = () => {
    const currentUser = useAuth();

    const [userData, setUserData] = useState([]);
    const [contests, setContests] = useState([]);

    //getting user Data
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(
                    "https://lu-cp-archive-backend.onrender.com/users"
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getUserData())();
    }, []);

    // getting page contents
    useEffect(() => {
        const getPageContent = async () => {
            try {
                const response = await fetch(
                    "https://lu-cp-archive-backend.onrender.com/lu-problemsolver-short-contest"
                );
                if (!response.ok) throw Error("Did not received expected data");
                const data = await response.json();
                setContests(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        (async () => await getPageContent())();
    }, []);

    let userStatus;
    userData.forEach((usrDta) => {
        const userEmail = usrDta.email;
        if (currentUser?.email === userEmail) {
            userStatus = usrDta.role;
        }
    });

    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);
    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };
    return (
        <div>
            <Header />
            {contests.length ? (
                <div
                    className={styles.container}
                    style={{ paddingLeft: "20%", paddingRight: "20%" }}
                >
                    <div className={styles.wrapper}>
                        <div
                            className={styles.problem_section}
                            style={{ width: "100%" }}
                        >
                            {contests.map((item) => (
                                <LinkCard
                                    key={item._id}
                                    cardURL={item.url}
                                    cardTitle={item.title}
                                />
                            ))}

                            {userStatus === "power" ? (
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
            ) : (
                <Stack sx={{ width: "100%", color: "grey.500" }}>
                    <LinearProgress color="inherit" />
                </Stack>
            )}

            {addProblemToggle ? (
                <AddResourcesModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default LUPSshortContest;
