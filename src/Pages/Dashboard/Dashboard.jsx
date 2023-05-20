import React, { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard/dashboard.module.css';
import Card from '../../components/Card.jsx';

const Dashboard = () => {
    const [cardInfo, setCardInfo] = useState([]);

    // card data fetching
    useEffect(() => {
        fetch('./Data/CardData/DashboardData.json')
            .then(res => res.json())
            .then(data => {
                setCardInfo(data);
            });
    }, []);

    return (
        <div>
            <div className={styles.body_container}>
                <div className={styles.height1}></div>
                <div className={styles.card_container}>
                    {cardInfo.map(cardData => (
                        <Card
                            key={cardData.key}
                            icon={cardData.icon}
                            title={cardData.title}
                            subtitle={cardData.subtitle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
