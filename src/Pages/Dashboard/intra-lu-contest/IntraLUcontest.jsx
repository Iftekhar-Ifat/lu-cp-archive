import React, { useState, useEffect } from 'react';
import { LinearProgress, Stack } from '@mui/material';
import LinkCard from '../../../components/LinkCard.jsx';
import styles from '../../../styles/components/TopicWiseDynamic.module.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddResourcesModal from '../../../components/AddForms/AddResourcesModal.jsx';
import { useAuth } from '../../../context/AuthProvider.jsx';
import axios from 'axios';
import ColdStartNotification from '../../../components/ColdStartNotification.jsx';

const IntraLUcontest = () => {
    const currentUserEmail = useAuth().currentUser.email;

    const [userData, setUserData] = useState([]);
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setLoading(true);
        //getting user Data
        const getUserData = axios.get(
            'https://lu-cp-archive-backend.onrender.com/users',
            {
                params: { currentUserEmail: currentUserEmail },
            }
        );

        const getPageContent = axios.get(
            'https://lu-cp-archive-backend.onrender.com/intra-lu-contest'
        );

        Promise.all([getUserData, getPageContent]).then(response => {
            setUserData(response[0].data);
            setContests(response[1].data);
            setLoading(false);
        });
    }, [currentUserEmail]);

    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };

    //
    return (
        <div>
            {loading ? (
                <>
                    <Stack sx={{ width: '100%', color: 'grey.500' }}>
                        <LinearProgress color="inherit" />
                    </Stack>
                    <ColdStartNotification />
                </>
            ) : null}
            {addProblemToggle ? (
                <AddResourcesModal show={show} setShow={setShow} />
            ) : (
                <div
                    className={styles.container}
                    style={{ paddingLeft: '20%', paddingRight: '20%' }}
                >
                    <div className={styles.wrapper}>
                        <div
                            className={styles.problem_section}
                            style={{ width: '100%' }}
                        >
                            {contests.map(item => (
                                <LinkCard
                                    key={item._id}
                                    cardURL={item.url}
                                    cardTitle={item.title}
                                />
                            ))}

                            {userData.role === 'power' ? (
                                <div className={styles.add_btn}>
                                    <Fab
                                        size="medium"
                                        color="secondary"
                                        aria-label="add"
                                        style={{ background: '#2E2F31' }}
                                        onClick={addProblemHandler}
                                    >
                                        <AddIcon />
                                    </Fab>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntraLUcontest;
