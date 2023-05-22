import { useState, useEffect } from 'react';
import Card from '../../../components/Card.jsx';
import styles from '../../../styles/Dashboard/dashboard.module.css';
import AddCardsModal from '../../../components/AddForms/AddCardsModal.jsx';
import axios from 'axios';
import { LinearProgress, Stack } from '@mui/material';
import ColdStartNotification from '../../../components/ColdStartNotification.jsx';
import { useAuth } from '../../../context/AuthProvider.jsx';

const Topics = () => {
    const [cardInfo, setCardInfo] = useState([]);
    const [userData, setUserData] = useState([]);
    const [toggleAddCardModal, setToggleAddCardModal] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    //getting current user
    const currentUserEmail = useAuth().currentUser.email;

    useEffect(() => {
        setLoading(true);
        // card data fetching
        const getCardData = axios.get(
            'https://lu-cp-archive-backend.onrender.com/cards'
        );

        //getting user data
        const getUserData = axios.get(
            'https://lu-cp-archive-backend.onrender.com/users',
            {
                params: { currentUserEmail: currentUserEmail },
            }
        );

        Promise.all([getCardData, getUserData])
            .then(responses => {
                setCardInfo(responses[0].data);
                setUserData(responses[1].data);
            })
            .catch(error => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentUserEmail]);

    return (
        <div>
            {!loading ? (
                <div className={styles.body_container}>
                    <div className={styles.height1}></div>
                    <div className={styles.card_container}>
                        {cardInfo.map(cardData => (
                            <Card
                                key={cardData._id}
                                icon={cardData.icon}
                                title={cardData.title}
                                subtitle={cardData.subtitle}
                            />
                        ))}
                        {userData.role === 'power' ? (
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
                    <Stack sx={{ width: '100%', color: 'grey.500' }}>
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
