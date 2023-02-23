import React, { useState, useEffect } from "react";
import LinkCard from "../../../components/LinkCard";
import styles from "../../../styles/components/TopicWiseDynamic.module.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddResourcesModal from "../../../components/AddForms/AddResourcesModal";
import { LinearProgress, Stack } from "@mui/material";
import ColdStartNotification from "../../../components/ColdStartNotification";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";

const LUPSmarathonContest = () => {
    const currentUserEmail = useAuth().currentUser.email;

    const [userData, setUserData] = useState([]);
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setLoading(true);
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

        const getPageContent = async () => {
            try {
                axios
                    .get(
                        "https://lu-cp-archive-backend.onrender.com/lu-problemsolver-marathon-contest"
                    )
                    .then((response) => {
                        setContests(response.data);
                    });
            } catch (err) {
                console.log(err.message);
            }
        };

        Promise.all([getUserData(), getPageContent()]);
        setLoading(false);
    }, [currentUserEmail]);

    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };

    return (
        <div>
            {loading ? (
                <>
                    <Stack sx={{ width: "100%", color: "grey.500" }}>
                        <LinearProgress color="inherit" />
                    </Stack>
                    <ColdStartNotification />
                </>
            ) : (
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

                            {userData.role === "power" ? (
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
            )}

            {addProblemToggle ? (
                <AddResourcesModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default LUPSmarathonContest;
