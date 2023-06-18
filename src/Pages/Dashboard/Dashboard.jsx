import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../../styles/Dashboard/dashboard.module.css';
import Card from '../../components/Card.jsx';
import Loading from '../../components/Loading';

const Dashboard = () => {
    const cardInfo = useQuery({
        queryKey: ['cardInfo'],
        queryFn: async () => {
            const result = await axios.get(
                './Data/CardData/DashboardData.json'
            );
            return result.data;
        },
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    if (cardInfo.isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div className={styles.body_container}>
                <div className={styles.height1}></div>
                <div className={styles.card_container}>
                    {cardInfo.data.map(cardData => (
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
