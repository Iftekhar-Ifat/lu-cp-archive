import styles from '../../styles/Profile/profile.module.css';
import { Container, Grid } from '@mui/material';
import NameAndImage from '../../components/Profile/NameAndImage.jsx';
import { useAuth } from '../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../components/queries/ProfileQuery';
import Loading from '../../components/Loading';
import ColdStartNotification from '../../components/ColdStartNotification';
import CodeforcesPlatform from '../../components/Profile/CodeforcesPlatform.jsx';
import AddStudentId from '../../components/Profile/AddStudentId';
import { useState } from 'react';
import StopStalkPlatform from '../../components/Profile/StopStalkPlatform';
import AddAdmin from '../../components/Profile/AddAdmin';

const Profile = () => {
    const currentUserEmail = useAuth().currentUser.email;
    const [hasCodeforcesAccount, setHasCodeforcesAccount] = useState();
    const [hasStopstalkAccount, setHasStopstalkAccount] = useState();
    const [hasStudentId, setHasStudentId] = useState();

    const userData = useQuery({
        queryKey: ['user-profile-data'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        onSuccess: data => {
            data.handles.forEach(handle => {
                if (handle.platform === 'codeforces') {
                    setHasCodeforcesAccount(handle.handle);
                }
                if (handle.platform === 'studentid') {
                    setHasStudentId(handle.handle);
                }
                if (handle.platform === 'stopstalk') {
                    setHasStopstalkAccount(handle.handle);
                }
            });
        },
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
                style={{ marginBottom: '1.5em' }}
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
            >
                {userData.isSuccess ? (
                    <CodeforcesPlatform
                        hasCodeforcesAccount={hasCodeforcesAccount}
                    />
                ) : null}

                {userData.isSuccess ? (
                    <AddStudentId hasStudentId={hasStudentId} />
                ) : null}
                {userData.isSuccess ? (
                    <StopStalkPlatform
                        hasStopstalkAccount={hasStopstalkAccount}
                    />
                ) : null}
                {userData.data.role === 'power' ? (
                    <AddAdmin currentUserEmail={currentUserEmail} />
                ) : null}
            </Grid>
        </Container>
    );
};

export default Profile;
