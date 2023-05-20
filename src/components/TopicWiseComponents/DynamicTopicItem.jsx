import React, { useState } from 'react';
import styles from '../../styles/components/TopicWiseDynamic.module.css';
import ProblemCard from './ProblemCard';
import Resources from '../Resources';
import ProgressBarCard from './ProgressBarCard';
import AddProblemModal from '../AddForms/AddProblemModal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const DynamicTopicItem = props => {
    const [addProblemToggle, setAddProblemToggle] = useState(false);
    const [show, setShow] = useState(false);
    const addProblemHandler = () => {
        setAddProblemToggle(true);
        setShow(true);
    };

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
                        {props.problems.map(problem => (
                            <ProblemCard
                                key={problem._id}
                                title={problem.title}
                                url={problem.url}
                                difficulty={problem.difficulty}
                                role={props.userRole}
                                problemStatusChange={props.problemStatusChange}
                                statusColor={problem.color}
                                tags={problem.tags}
                            />
                        ))}
                        {props.userRole === 'power' ? (
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
                                    <AddIcon />
                                </Fab>
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.sidebar_container}>
                        {/* <ProgressBarCard
                            userProblems={props.userProblems}
                            allProblems={props.problems}
                        />
                        <Resources
                            key={props.resources._id}
                            userRole={props.userRole}
                            resources={props.resources}
                        /> */}
                    </div>
                </div>
            </div>
            {addProblemToggle ? (
                <AddProblemModal
                    show={show}
                    setShow={setShow}
                    allTags={props.allTags}
                />
            ) : null}
        </div>
    );
};

export default DynamicTopicItem;
