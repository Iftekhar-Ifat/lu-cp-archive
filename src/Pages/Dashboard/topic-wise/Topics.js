import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import styles from "../../../styles/Dashboard/dashboard.module.css";
import AddCardsModal from "../../../components/AddForms/AddCardsModal";
import axios from "axios";
import { LinearProgress, Stack } from "@mui/material";
import ColdStartNotification from "../../../components/ColdStartNotification";
import { useAuth } from "../../../context/AuthProvider";

const Topics = () => {
    const [cardInfo, setCardInfo] = useState([]);
    const [userData, setUserData] = useState([]);
    const [toggleAddCardModal, setToggleAddCardModal] = useState(false);
    const [show, setShow] = useState(false);

    //getting current user
    const currentUserEmail = useAuth().currentUser.email;

    useEffect(() => {
        // card data fetching
        const getCardData = async () => {
            try {
                axios
                    .get("https://lu-cp-archive-backend.onrender.com/cards")
                    .then((response) => {
                        setCardInfo(response.data);
                    });
            } catch (err) {
                console.log(err.message);
            }
        };
        //getting user data
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
        Promise.all([getCardData(), getUserData()]);
    }, [currentUserEmail]);

    return (
        <div>
            {cardInfo && userData ? (
                <div className={styles.body_container}>
                    <div className={styles.height1}></div>
                    <div className={styles.card_container}>
                        {cardInfo.map((cardData) => (
                            <Card
                                key={cardData._id}
                                icon={cardData.icon}
                                title={cardData.title}
                                subtitle={cardData.subtitle}
                            />
                        ))}
                        {userData.role === "power" ? (
                            <Card
                                icon="https://i.ibb.co/tJnhkbF/add-card.png"
                                title="Add Card"
                                setToggleAddCardModal={setToggleAddCardModal}
                                setShow={setShow}
                            />
                        ) : null}
                    </div>
                </div>
            ) : (
                <>
                    <Stack sx={{ width: "100%", color: "grey.500" }}>
                        <LinearProgress color="inherit" />
                    </Stack>
                    <ColdStartNotification />
                </>
            )}
            {toggleAddCardModal ? (
                <AddCardsModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default Topics;
