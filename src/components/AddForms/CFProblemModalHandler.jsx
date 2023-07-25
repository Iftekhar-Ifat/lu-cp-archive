import { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import { Spacer } from '@geist-ui/core';
import { inputHandler } from '../ApiComponents/handleInput';
import { useAuth } from '../../context/AuthProvider';

const CFProblemModalHandler = ({ setShow }) => {
    const currentUserEmail = useAuth().currentUser.email;

    const path = window.location.pathname.split('/').pop();
    // getting input for problem
    const cfProblemName = useRef();
    const cfProblemUrl = useRef();
    const cfProblemDifficulty = path;

    const [btnDisable, setBtnDisable] = useState(false);

    const getCfProblemInfo = () => {
        setBtnDisable(true);
        const cfProblemData = {
            email: currentUserEmail,
            itemId: 'cf-problems',
            title: cfProblemName.current.value,
            url: cfProblemUrl.current.value,
            difficulty: cfProblemDifficulty,
            route: cfProblemDifficulty,
        };
        if (
            cfProblemData.title.length === 0 ||
            cfProblemData.url.length === 0
        ) {
            alert('Please fill up the form❗');
            setBtnDisable(false);
        } else {
            inputHandler(cfProblemData, setShow);
        }
    };

    return (
        <div
            style={{
                padding: '3%',
                justifyContent: 'space-evenly',
            }}
        >
            <TextField
                inputRef={cfProblemName}
                fullWidth
                label="Problem Name"
                autoComplete="off"
            />
            <Spacer />
            <TextField
                inputRef={cfProblemUrl}
                fullWidth
                label="CF Problem Url"
                id="fullWidth"
                autoComplete="off"
            />
            <Spacer />
            <Spacer />
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-evenly',
                }}
            >
                <Button
                    variant="contained"
                    color="neutral"
                    onClick={() => setShow(false)}
                    disabled={btnDisable}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="neutral"
                    onClick={getCfProblemInfo}
                    disabled={btnDisable}
                >
                    Add Problem
                </Button>
            </div>
        </div>
    );
};

export default CFProblemModalHandler;
