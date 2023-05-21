import React from 'react';
import styles from '../../styles/Profile/profile.module.css';
import { useAuth } from '../../context/AuthProvider.jsx';
import { Container, Grid, IconButton, TextField } from '@mui/material';
import NameAndImage from '../../components/Profile/NameAndImage';
import SinglePlatform from '../../components/Profile/SinglePlatform';

const Profile = () => {
    const user = useAuth();
    const platforms = [
        {
            name: 'Codeforces',
            link: 'https://codeforces.com/profile/abhishek_080',
            icon: '/images/icons/codeforces_icon.png',
            rating: 1600,
            maxRating: 1600,
            rank: 'Newbie',
            maxRank: 'Newbie',
            solved: 0,
            attempted: 0,
            accuracy: 0,
        }, {
            name: 'Codechef',
            link: 'https://www.codechef.com/users/abhishek_080',
            icon: '/images/icons/codechef_icon.png',
            rating: 1600,
            maxRating: 1600,
            rank: 'Newbie',
            maxRank: 'Newbie',
            solved: 0,
            attempted: 0,
            accuracy: 0,
        },
        {
            name: 'Vjudge',
            link: 'https://www.vjudge.net/profile/VJudgeUser',
            icon: '/images/icons/codeforces_icon.png',
            rating: 1900,
            maxRating: 2000,
            rank: 'Specialist',
            maxRank: 'Expert',
            solved: 120,
            attempted: 150,
            accuracy: 80
        }
    ];
    const isRegistered = true;
    return (
        <Container maxWidth="lg" className={styles.wrapper}>
            {/* name and image component */}
            <NameAndImage />
            <hr />
            {/* card for info showing */}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    platforms.map((item, index) => {
                        return (<SinglePlatform key={index} platform={item} isRegistered={isRegistered} />);
                    })
                }
            </Grid>
        </Container>
    );
};

export default Profile;
