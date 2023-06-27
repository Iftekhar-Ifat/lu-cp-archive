import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

const ColdStartNotification = () => {
    const [notification, setNotification] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification(false);
    };
    return (
        <Snackbar
            open={notification}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: '100%' }}
            >
                The response might be slow because of the server&apos;s cold
                start. Try to Reload !
            </Alert>
        </Snackbar>
    );
};

export default ColdStartNotification;
