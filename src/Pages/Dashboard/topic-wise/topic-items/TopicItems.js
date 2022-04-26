// This page doesn't have any functionality

import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import Card from "../../../../components/Card";
import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useParams } from "react-router-dom";

const TopicItems = (props) => {
    // card data fetching
    let { topicItem } = useParams();

    const [cardInfo, setCardInfo] = useState([]);
    useEffect(() => {
        fetch(`../../Data/CardData/${topicItem}.json`)
            .then((res) => res.json())
            .then((data) => {
                setCardInfo(data);
            });
    }, [topicItem]);

    return (
        <div>
            <Header />
            <div className={styles.body_container}>
                <div className={styles.height1}></div>
                <div className={styles.card_container}>
                    {cardInfo.map((cardData) => (
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

export default TopicItems;
