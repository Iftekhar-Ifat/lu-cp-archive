import AddIcon from '@mui/icons-material/Add';
import { Fab, LinearProgress } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddProblemModal from '../../../../components/AddForms/AddProblemModal.jsx';
import Loading from '../../../../components/Loading';
import Resources from '../../../../components/Resources.jsx';
import ProblemCard from '../../../../components/TopicWiseComponents/ProblemCard.jsx';
import ProgressBarCard from '../../../../components/TopicWiseComponents/ProgressBarCard.jsx';
import { processData } from '../../../../components/TopicWiseComponents/processDataHandler';
import {
    getProblemData,
    getResourcesData,
    getTagsData,
    getUserData,
} from '../../../../components/queries/TopicProblemsQuery';
import { useAuth } from '../../../../context/AuthProvider.jsx';
import styles from '../../../../styles/components/TopicWiseDynamic.module.css';

const API = import.meta.env.VITE_BACKEND_API;

const TopicProblem = () => {
    //getting route
    let problemRoute = useParams();

    const queryClient = useQueryClient();
    //getting user
    const currentUserEmail = useAuth().currentUser.email;

    const [problemStatus, setProblemStatus] = useState();
    const [userProblemStatus, setUserProblemStatus] = useState();

    // add problem
    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);
    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const problems = useQuery({
        queryKey: [`${problemRoute.topicProblems}_Problems`],
        queryFn: () => getProblemData(problemRoute),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const resources = useQuery({
        queryKey: [`${problemRoute.topicProblems}_Resources`],
        queryFn: () => getResourcesData(problemRoute),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const allTags = useQuery({
        queryKey: ['topicwiseTags'],
        queryFn: getTagsData,
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (userData.isSuccess && problems.isSuccess) {
            processData(userData.data, problems.data)
                .then(processedData => {
                    setUserProblemStatus(processedData);
                })
                .catch(error => console.error(error));
        }
    }, [userData.isSuccess, problems.isSuccess, userData.data, problems.data]);

    //updating problem state
    useEffect(() => {
        try {
            axios
                .post(`${API}/update-problem-status`, {
                    ...problemStatus,
                })
                .then(() => {
                    queryClient.invalidateQueries('userData');
                });
        } catch (err) {
            console.log(err.message);
        }
    }, [problemStatus, queryClient]);

    if (
        userData.isLoading ||
        problems.isLoading ||
        resources.isLoading ||
        allTags.isLoading
    ) {
        return (
            <>
                <Loading />
                <LinearProgress color="inherit" />
            </>
        );
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.problem_section}>
                        <div className={styles.problem_section_header}>
                            <div className={styles.status}>Status</div>
                            <div className={styles.title_div}>Title</div>
                            <div className={styles.difficulty}>Difficulty</div>
                        </div>
                        {problems.data.map(problem => (
                            <ProblemCard
                                key={problem._id}
                                title={problem.title}
                                url={problem.url}
                                difficulty={problem.difficulty}
                                role={userData.data.role}
                                problemStatusChange={setProblemStatus}
                                statusColor={problem.color}
                                tags={problem.tags}
                            />
                        ))}
                        {userData.data.role === 'power' ? (
                            <div className={styles.add_btn}>
                                <Fab
                                    size="medium"
                                    color="secondary"
                                    aria-label="add"
                                    style={{
                                        background: '#2E2F31',
                                        zIndex: 0,
                                    }}
                                    onClick={addProblemHandler}
                                >
                                    <AddIcon style={{ color: 'white' }} />
                                </Fab>
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.sidebar_container}>
                        {userProblemStatus ? (
                            <ProgressBarCard
                                userProblems={userProblemStatus}
                                allProblems={problems.data}
                            />
                        ) : (
                            <Loading />
                        )}

                        <Resources
                            key={resources._id}
                            userRole={userData.data.role}
                            resources={resources.data}
                        />
                    </div>
                </div>
            </div>
            {addProblemToggle ? (
                <AddProblemModal
                    show={show}
                    setShow={setShow}
                    allTags={allTags.data}
                />
            ) : null}
        </div>
    );
};

export default TopicProblem;
