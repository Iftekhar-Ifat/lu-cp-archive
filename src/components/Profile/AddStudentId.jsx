import { Grid, IconButton, TextField } from '@mui/material';
import styles from '../../styles/Profile/profile.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, useState } from 'react';
import { platformHandleInput } from '../ApiComponents/handlePlatformHandle';
import { useAuth } from '../../context/AuthProvider';

const AddStudentId = ({ hasStudentId }) => {
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
                platform: 'studentid',
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
    return (
        <Grid item xs={2} sm={4} md={4}>
            <div className={styles.card_wrapper}>
                <div className={styles.icon_and_name}>
                    <img
                        src="/images/icons/student_icon.png"
                        style={{ width: '50px', height: '45px' }}
                        alt="icon-image"
                    />
                    <p className={styles.platform_name}>Student ID</p>
                </div>
                <hr className={styles.hr} />
                {hasStudentId ? (
                    <div>
                        <div className={styles.info}>
                            <div>
                                <TextField
                                    label={hasStudentId}
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
                    </div>
                ) : (
                    <div style={{ marginTop: '10px' }}>
                        <TextField
                            label="add your student Id..."
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

export default AddStudentId;
