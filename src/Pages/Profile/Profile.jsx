import React from 'react';
import styles from '../../styles/Profile/profile.module.css';
import { useAuth } from '../../context/AuthProvider.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            neutral: {
                main: '#18181b',
                contrastText: '#fff',
            },
        },
    });

    const user = useAuth();

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.wrapper}>
                <div>
                    <img
                        alt="user_photo"
                        src={user.currentUser.photoURL}
                        className={styles.user_photo}
                    />
                    <h2>{user.currentUser.displayName}</h2>
                </div>

                <div
                    style={{
                        fontSize: '20px',
                    }}
                >
                    Handles
                </div>
                <div className={styles.handle_wrapper}>
                    <div className={styles.web_title}>
                        <img
                            src="../images/icons/codeforces_icon.png"
                            style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                            }}
                            alt="site-icon"
                        />
                        <div
                            style={{
                                paddingLeft: '10px',
                                fontSize: '20px',
                            }}
                        >
                            Codeforces
                        </div>
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                    </div>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Profile;
