import { useState } from 'react';
import LinkCard from '../../../components/LinkCard.jsx';
import styles from '../../../styles/components/TopicWiseDynamic.module.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddResourcesModal from '../../../components/AddForms/AddResourcesModal.jsx';
import { useAuth } from '../../../context/AuthProvider.jsx';
import { useQuery } from '@tanstack/react-query';
import {
    getUserData,
    getLUPSmarathonContestData,
} from '../../../components/queries/LUPSmarathonContestQuery.js';
import Loading from '../../../components/Loading.jsx';
import ColdStartNotification from '../../../components/ColdStartNotification.jsx';

const LUPSmarathonContest = () => {
    const currentUserEmail = useAuth().currentUser.email;

    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const contests = useQuery({
        queryKey: ['lups-marathon-contests'],
        queryFn: getLUPSmarathonContestData,
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };

    if (userData.isLoading || contests.isLoading) {
        return (
            <>
                <Loading />
                <ColdStartNotification />
            </>
        );
    }

    return (
        <div>
            <div
                className={styles.container}
                style={{ paddingLeft: '20%', paddingRight: '20%' }}
            >
                <div className={styles.wrapper}>
                    <div
                        className={styles.problem_section}
                        style={{ width: '100%' }}
                    >
                        {contests.data.map(item => (
                            <LinkCard
                                key={item._id}
                                cardURL={item.url}
                                cardTitle={item.title}
                            />
                        ))}

                        {userData.data.role === 'power' ? (
                            <div className={styles.add_btn}>
                                <Fab
                                    size="medium"
                                    color="secondary"
                                    aria-label="add"
                                    style={{ background: '#2E2F31' }}
                                    onClick={addProblemHandler}
                                >
                                    <AddIcon style={{ color: 'white' }} />
                                </Fab>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {addProblemToggle ? (
                <AddResourcesModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default LUPSmarathonContest;
