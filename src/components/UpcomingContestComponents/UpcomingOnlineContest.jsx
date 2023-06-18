import styles from '../../styles/upcoming_contests/FeaturedContest.module.css';
import ContestCard from './ContestCard';
import 'moment-timezone';

const UpcomingOnlineContest = props => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1
                        style={{
                            color: 'white',
                            borderBottom: '3px solid white',
                            textAlign: 'center',
                        }}
                    >
                        Upcoming Online Contest
                    </h1>
                </div>
                <div className={styles.title_bar}>
                    <span style={{ width: '40%' }}>Contest</span>
                    <span style={{ width: '20%' }}>Starting Time</span>
                    <span style={{ width: '20%' }}>Duration</span>
                    <span style={{ width: '20%' }}>Time Left</span>
                </div>
                {props.allContests.length ? (
                    <div className={styles.card_section}>
                        {props.allContests.map(contest => (
                            <ContestCard
                                key={contest.url}
                                contest={contest}
                                platform={contest.platform}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default UpcomingOnlineContest;
