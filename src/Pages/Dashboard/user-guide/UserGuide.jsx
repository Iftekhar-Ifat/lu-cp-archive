import { Container, Typography } from '@mui/material';
import styles from '../../../styles/UserGuide/UserGuide.module.css';
import InfoIcon from '@mui/icons-material/Info';
import ProfileImage from '/images/readme/profile.png';
import CfProblemsImage from '/images/readme/cf-problems.png';
import TopicWiseProblemImg from '/images/readme/topic-wise-problem.png';

const UserGuide = () => {
    return (
        <Container style={{ color: 'white', fontFamily: 'Inter' }}>
            <div className={styles.section_wrapper}>
                <div className={styles.guide_title}>
                    <Typography variant="h3">
                        Welcome to LU Competitive Programming Archive
                    </Typography>
                </div>
                <Typography>
                    LU-CP-Archive is an application aimed to aid students who
                    are competing in programming competitions. The volume of
                    problems provided by all the competitive programming sites
                    overwhelms the students. This platform tries to make their
                    life a bit easier.
                </Typography>
                <div className={styles.section_wrapper}>
                    <Typography variant="h4">Profile Info</Typography>
                    <Typography>
                        Programmers can add their codeforces user handle,
                        student id, and stopstalk id in their profile section
                        after creating their account.{' '}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={ProfileImage}
                            alt="profile"
                            style={{ maxWidth: '95%' }}
                        />
                    </div>
                    <small
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <i
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            NB: programmer must add their codeforces handle in
                            order to be featured in the Leaderboard
                        </i>
                    </small>
                </div>

                <div className={styles.sub_title}>
                    <Typography variant="h4">Codeforces Ladder</Typography>
                    <Typography>
                        After adding the codeforces account he/she will be able
                        to see his/her solved problem in the codeforces ladder
                        section.
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={CfProblemsImage}
                            alt="cf-problems"
                            style={{ maxWidth: '95%' }}
                        />
                    </div>
                </div>

                <div className={styles.sub_title}>
                    <Typography variant="h4">Topic-wise Problem</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={TopicWiseProblemImg}
                            alt="topic-wise-problem"
                            style={{ maxWidth: '95%' }}
                        />
                    </div>
                    <Typography>
                        <ol>
                            <li>
                                The colored circle indicates the problem status.{' '}
                                <font style={{ color: '#FF6400' }}>
                                    Orange{' '}
                                </font>
                                implies it is under the process of you solving
                                it.{' '}
                                <font style={{ color: '#00ff00' }}>Green </font>
                                means the problem has been solved.{' '}
                                <font style={{ color: '#c000ff' }}>
                                    Purple{' '}
                                </font>
                                indicates you are reviewing the problem at hand.
                                Lastly,{' '}
                                <font style={{ color: '#ff0000' }}>red </font>
                                suggests that you&apos;ve skipped the problem.
                            </li>
                            <li>
                                If there is any problem you want the status to
                                be changed, just click on the circle and a menu
                                will pop up. From here you can change the
                                problem status manually. It is a handy feature
                                to keep track of the problems you solve.
                            </li>
                            <li>
                                The problem difficulty is shown here along with
                                the tags. To see what category any particular
                                problem belongs to, just hover your mouse on the{' '}
                                <InfoIcon /> .
                            </li>
                        </ol>
                    </Typography>
                </div>
            </div>
        </Container>
        // <div className={styles.container}>

        //             <u>Welcome to LU Competitive Programming Archive</u>
        //     <div className={styles.contents}>
        //         <div style={{ color: 'white', fontFamily: 'Inter' }}>

        //         </div>
        //     </div>
        // </div>
    );
};

export default UserGuide;
