import { Grid, IconButton, TextField } from '@mui/material';
import styles from '../../styles/Profile/profile.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRef, useState } from 'react';
import { handleAddAdmin } from '../ApiComponents/handleAddAdmin';

const AddAdmin = ({ currentUserEmail }) => {
    const [error, setError] = useState(false);
    const emailRef = useRef();

    const getEmail = async () => {
        const value = emailRef.current.value;
        if (value.trim() === '') {
            setError(true);
        } else {
            await handleAddAdmin(currentUserEmail, value);
            setError(false);
        }
    };
    return (
        <Grid item xs={2} sm={4} md={4}>
            <div className={styles.card_wrapper}>
                <div className={styles.icon_and_name}>
                    <img
                        src="/images/icons/admin_icon.png"
                        style={{ width: '50px', height: '45px' }}
                        alt="icon-image"
                    />
                    <p className={styles.platform_name}> Add Admin</p>
                </div>
                <hr className={styles.hr} />

                <div>
                    <div className={styles.info}>
                        <TextField
                            label="add email"
                            error={error}
                            helperText={error ? 'Value cannot be empty' : ''}
                            inputRef={emailRef}
                        />
                        <IconButton
                            aria-label="handle"
                            size="large"
                            onClick={getEmail}
                        >
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Grid>
    );
};

export default AddAdmin;
