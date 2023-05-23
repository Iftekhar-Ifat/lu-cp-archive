import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../../styles/Dashboard/dashboard.module.css';
import Card from '../../components/Card.jsx';

const Dashboard = () => {
    const { data: cardInfo, isLoading } = useQuery({
        queryKey: ['cardInfo'],
        queryFn: async () => {
            const result = await axios.get(
                './Data/CardData/DashboardData.json'
            );
            return result.data;
        },
        cacheTime: Infinity,
    });

    if (isLoading) {
        return <h1 style={{ color: 'white' }}>Loading...</h1>;
    }

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
