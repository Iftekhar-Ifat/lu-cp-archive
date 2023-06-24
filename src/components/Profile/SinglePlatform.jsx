import styles from '../../styles/Profile/profile.module.css';
import { Grid, IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, useState } from 'react';
import { platformHandleInput } from '../ApiComponents/handlePlatformHandle';
import { useAuth } from '../../context/AuthProvider';
import { getCFInfo } from '../queries/ProfileQuery';
import { useQuery } from '@tanstack/react-query';
import { getRatingColor } from './getColors';

const SinglePlatform = ({ hasAccount }) => {
    let currentUserEmail = useAuth().currentUser.email;

    const [textFieldMode, setTextFieldMode] = useState(false);
    const [error, setError] = useState(false);
    const handleRef = useRef();

    const getHandle = () => {
        const value = handleRef.current.value;
        if (value.trim() === '') {
            setError(true);
        } else {
            let handleInfo = {
                userEmail: currentUserEmail,
                platform: 'codeforces',
                handle: value,
            };
            platformHandleInput(handleInfo);
            setError(false);
        }
    };
    const handleCancel = () => {
        setError(false);
        setTextFieldMode(false);
    };

    const toggleTextFieldMode = () => {
        if (textFieldMode === false) {
            setTextFieldMode(true);
        } else {
            setTextFieldMode(false);
        }
    };

    const userCFinfo = useQuery({
        queryKey: ['user-cf-info'],
        queryFn: () => getCFInfo(hasAccount),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    let currentRatingColor;
    let maxRatingColor;
    if (userCFinfo.isSuccess) {
        currentRatingColor = getRatingColor(userCFinfo.data.rating);
        maxRatingColor = getRatingColor(userCFinfo.data.maxRating);
    }

    return (
        <Grid item xs={2} sm={4} md={4}>
            <div className={styles.card_wrapper}>
                {/* icon and name */}
                <div className={styles.icon_and_name}>
                    <img
                        src="/images/icons/codeforces_icon.png"
                        style={{ width: '50px', height: '45px' }}
                        alt="icon-image"
                    />
                    <p className={styles.platform_name}> Codeforces</p>
                </div>
                <hr className={styles.hr} />
                {hasAccount ? (
                    <div>
                        <div className={styles.info}>
                            <div>
                                <TextField
                                    label={hasAccount}
                                    disabled={!textFieldMode}
                                    error={error}
                                    helperText={
                                        error ? 'Value cannot be empty' : ''
                                    }
                                    inputRef={handleRef}
                                />

                                {textFieldMode ? (
                                    <>
                                        <IconButton
                                            aria-label="handle"
                                            size="large"
                                            onClick={getHandle}
                                        >
                                            <CheckCircleIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="handle"
                                            size="large"
                                            onClick={handleCancel}
                                        >
                                            <CancelIcon fontSize="inherit" />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton
                                        aria-label="handle"
                                        size="large"
                                        onClick={toggleTextFieldMode}
                                    >
                                        <EditIcon fontSize="inherit" />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                        {userCFinfo.isSuccess ? (
                            <div style={{ width: '100%' }}>
                                <div className={styles.extra_info}>
                                    <p>
                                        Current Rating:{' '}
                                        <span
                                            style={{
                                                color: `${currentRatingColor}`,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {userCFinfo.data.rating}
                                        </span>
                                    </p>
                                    <p style={{ marginTop: '-10px' }}>
                                        (Max Ratting:{' '}
                                        <span
                                            style={{
                                                color: `${maxRatingColor}`,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {userCFinfo.data.maxRating}
                                        </span>
                                        ){' '}
                                    </p>
                                </div>
                                <div className={styles.extra_info}>
                                    <p>
                                        Current Rank:{' '}
                                        <span
                                            style={{
                                                color: `${currentRatingColor}`,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {userCFinfo.data.rank}
                                        </span>
                                    </p>
                                    <p style={{ marginTop: '-10px' }}>
                                        (Max Ranking:{' '}
                                        <span
                                            style={{
                                                color: `${maxRatingColor}`,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {userCFinfo.data.maxRank}
                                        </span>
                                        ){' '}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div style={{ marginTop: '10px' }}>
                        <TextField
                            label="add your handle..."
                            inputRef={handleRef}
                        />
                        <IconButton
                            aria-label="handle"
                            size="large"
                            onClick={getHandle}
                        >
                            <SaveIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                )}
            </div>
        </Grid>
    );
};

export default SinglePlatform;
