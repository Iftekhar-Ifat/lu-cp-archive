import { LinearProgress, Stack } from '@mui/material';
const Loading = () => {
    return (
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
            <LinearProgress color="inherit" />
        </Stack>
    );
};

export default Loading;
