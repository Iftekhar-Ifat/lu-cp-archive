import styles from '../../styles/Profile/profile.module.css';
import { Grid, IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useState } from 'react';
import { platformHandleInput } from '../ApiComponents/handlePlatformHandle';
import { useAuth } from '../../context/AuthProvider';

const SinglePlatform = ({ platform, isRegistered }) => {
    let currentUserEmail = useAuth().currentUser.email;
    const [textFieldMode, setTextFieldMode] = useState(false);
    const handleRef = useRef();

    const getHandle = () => {
        let handleInfo = {
            userEmail: currentUserEmail,
            platform: platform.name,
            handle: handleRef.current.value,
        };
        platformHandleInput(handleInfo);
    };

    const toggleTextFieldMode = () => {
        if (textFieldMode === false) {
            setTextFieldMode(true);
        } else {
            setTextFieldMode(false);
        }
    };

    return (
        <Grid item xs={2} sm={4} md={4} style={{ marginBottom: '3rem' }}>
            <div className={styles.card_wrapper}>
                {/* icon and name */}
                <div className={styles.icon_and_name}>
                    <img
                        src={platform.icon}
                        style={{ width: '50px', height: '45px' }}
                        alt="icon-image"
                    />
                    <p className={styles.platform_name}> {platform.name}</p>
                </div>
                <hr className={styles.hr} />
                {/* take info */}
                <div className={styles.info}>
                    <img
                        src="../images/icons/person.svg"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            padding: '12px',
                            objectFit: 'contain',
                        }}
                        alt="site-icon"
                    />
                    {isRegistered ? (
                        <>
                            <TextField
                                label="Has a handle"
                                disabled={!textFieldMode}
                                inputRef={handleRef}
                            />

                            {textFieldMode ? (
                                <IconButton
                                    aria-label="handle"
                                    size="large"
                                    onClick={getHandle}
                                >
                                    <CheckCircleIcon fontSize="inherit" />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="handle"
                                    size="large"
                                    onClick={toggleTextFieldMode}
                                >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                            )}
                        </>
                    ) : (
                        <>
                            <TextField
                                label="add your handle..."
                                inputRef={handleRef}
                            />
                            <IconButton
                                aria-label="handle"
                                size="large"
                                onClick={getHandle}
                            >
                                <CheckCircleIcon fontSize="inherit" />
                            </IconButton>
                        </>
                    )}
                </div>
                {isRegistered && (
                    <>
                        <div className={styles.extra_info}>
                            <p>
                                Current Rating:{' '}
                                <span
                                    style={{
                                        color: '#5BD9EA',
                                        fontWeight: 600,
                                    }}
                                >
                                    {platform.rating}
                                </span>
                            </p>
                            <p style={{ marginTop: '-10px' }}>
                                (Max Ratting:{' '}
                                <span
                                    style={{
                                        color: '#5BD9EA',
                                        fontWeight: 600,
                                    }}
                                >
                                    {platform.maxRating}
                                </span>
                                ){' '}
                            </p>
                        </div>
                        <div className={styles.extra_info}>
                            <p>
                                Current Rank:{' '}
                                <span
                                    style={{
                                        color: '#B799FF',
                                        fontWeight: 600,
                                    }}
                                >
                                    {platform.rank}
                                </span>
                            </p>
                            <p style={{ marginTop: '-10px' }}>
                                (Max Ranking:{' '}
                                <span
                                    style={{
                                        color: '#5BD9EA',
                                        fontWeight: 600,
                                    }}
                                >
                                    {platform.maxRank}
                                </span>
                                ){' '}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </Grid>
    );
};

export default SinglePlatform;
