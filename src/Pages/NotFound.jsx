import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
    container: {
        backgroundColor: '#18181b',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '16px',
    },
    heading: {
        color: '#ffffff',
        marginBottom: '32px',
    },
    button: {
        backgroundColor: '#2e2f31',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#3e3f41',
            color: '#ffffff',
        },
        '&:active': {
            backgroundColor: '#1e1f21',
            color: '#ffffff',
        },
        '&:focus': {
            backgroundColor: '#3e3f41',
            color: '#ffffff',
        },
    },
};

const NotFoundPage = () => {
    return (
        <Container maxWidth="sm" sx={styles.container}>
            <Typography variant="h2" sx={styles.heading}>
                Error 404: Page Not Found
            </Typography>
            <Typography variant="h5" sx={styles.heading}>
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                sx={styles.button}
            >
                Go back to homepage
            </Button>
        </Container>
    );
};

export default NotFoundPage;
