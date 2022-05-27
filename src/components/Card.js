import React from "react";
import styles from "../styles/components/Card.module.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const navigate = useNavigate();
    const routeHandler = () => {
        let processedRoute =
            window.location.pathname +
            "/" +
            props.title.replace(/\s+/g, "-").toLowerCase();
        navigate(processedRoute);
    };

    if (props.title === "Add Card") {
        return (
            <a
                onClick={() => {
                    props.setToggleAddCardModal(true);
                    props.setShow(true);
                }}
            >
                <div>
                    <div className={styles.card_container}>
                        <div className={styles.only_title_icon_div}>
                            <img
                                src={`${props.icon}`}
                                alt="card icon"
                                width={175}
                                height={175}
                            />
                        </div>
                        <div className={styles.only_title}>{props.title}</div>
                    </div>
                </div>
            </a>
        );
    } else if (props.subtitle) {
        return (
            <a onClick={routeHandler}>
                <div>
                    <div className={styles.card_container}>
                        <div className={styles.icon_div}>
                            <img
                                src={`/images/Cards/${props.icon}`}
                                alt="card icon"
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className={styles.card_title}>{props.title}</div>
                        <div className={styles.card_subtitle}>
                            {props.subtitle}
                        </div>
                    </div>
                </div>
            </a>
        );
    } else {
        return (
            <a onClick={routeHandler}>
                <div>
                    <div className={styles.card_container}>
                        <div className={styles.only_title_icon_div}>
                            <img
                                src={`${props.icon}`}
                                alt="card icon"
                                width={175}
                                height={175}
                            />
                        </div>
                        <div className={styles.only_title}>{props.title}</div>
                    </div>
                </div>
            </a>
        );
    }
};

export default Card;
