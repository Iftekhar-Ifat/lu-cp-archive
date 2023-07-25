import { useState } from 'react';
import Card from '../../../components/Card.jsx';
import styles from '../../../styles/Dashboard/dashboard.module.css';
import AddCardsModal from '../../../components/AddForms/AddCardsModal.jsx';
import ColdStartNotification from '../../../components/ColdStartNotification.jsx';
import { useAuth } from '../../../context/AuthProvider.jsx';
import { useQuery } from '@tanstack/react-query';
import {
    getCardData,
    getUserData,
} from '../../../components/queries/TopicsQuery.js';
import Loading from '../../../components/Loading.jsx';

const Topics = () => {
    const [toggleAddCardModal, setToggleAddCardModal] = useState(false);
    const [show, setShow] = useState(false);

    //getting current user
    const currentUserEmail = useAuth().currentUser.email;

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const cardInfo = useQuery({
        queryKey: ['topicCardInfo'],
        queryFn: getCardData,
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    if (cardInfo.isLoading || userData.isLoading) {
        return (
            <>
                <Loading />
                <ColdStartNotification />
            </>
        );
    }

    return (
        <div>
            <div className={styles.body_container}>
                <div className={styles.height1}></div>
                <div className={styles.card_container}>
                    {cardInfo.data.map(cardData => (
                        <Card
                            key={cardData._id}
                            icon={cardData.icon}
                            title={cardData.title}
                            subtitle={cardData.subtitle}
                        />
                    ))}
                    {userData.data.role === 'power' ? (
                        <Card
                            icon="../../images/Cards/add_card.png"
                            title="Add Card"
                            setToggleAddCardModal={setToggleAddCardModal}
                            setShow={setShow}
                        />
                    ) : null}
                </div>
            </div>
            {toggleAddCardModal ? (
                <AddCardsModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default Topics;
