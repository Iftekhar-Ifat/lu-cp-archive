import styles from '../styles/components/Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = props => {
    const navigate = useNavigate();
    const routeHandler = () => {
        if (props.title.toLowerCase() === 'leaderboard') {
            navigate('/leaderboard');
        } else {
            let processedRoute =
                window.location.pathname +
                '/' +
                props.title.replace(/\s+/g, '-').toLowerCase();
            navigate(processedRoute);
        }
    };

    if (props.title === 'Add Card') {
        return (
            <div
                onClick={() => {
                    props.setToggleAddCardModal(true);
                    props.setShow(true);
                }}
                style={{ cursor: 'pointer' }}
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
            </div>
        );
    } else if (props.subtitle) {
        return (
            <div onClick={routeHandler} style={{ cursor: 'pointer' }}>
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
            </div>
        );
    } else {
        return (
            <div onClick={routeHandler} style={{ cursor: 'pointer' }}>
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
            </div>
        );
    }
};

export default Card;
