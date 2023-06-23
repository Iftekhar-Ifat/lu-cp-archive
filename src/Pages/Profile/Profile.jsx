import styles from '../../styles/Profile/profile.module.css';
import { Container, Grid } from '@mui/material';
import NameAndImage from '../../components/Profile/NameAndImage.jsx';
import SinglePlatform from '../../components/Profile/SinglePlatform.jsx';
import { useAuth } from '../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../components/queries/ProfileQuery';
import Loading from '../../components/Loading';
import ColdStartNotification from '../../components/ColdStartNotification';

const Profile = () => {
    const currentUserEmail = useAuth().currentUser.email;

    const userData = useQuery({
        queryKey: ['userData-profile'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    if (userData.isLoading) {
        return (
            <>
                <Loading />;
                <ColdStartNotification />
            </>
        );
    }

    return (
        <Container maxWidth="lg" className={styles.wrapper}>
            <NameAndImage />
            <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
            >
                <SinglePlatform hasAccount={userData.data.userHandle} />
            </Grid>
        </Container>
    );
};

export default Profile;
