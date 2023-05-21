import React from 'react';
import Homepage from './Pages/Homepage/Homepage.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topics from './Pages/Dashboard/topic-wise/Topics.jsx';
import TopicProblem from './Pages/Dashboard/topic-wise/topic-problem/TopicProblem.jsx';
import CFladder from './Pages/Dashboard/cf-ladder/CFladder.jsx';
import CFladderProblems from './Pages/Dashboard/cf-ladder/cf-ladder-problems/CFladderProblems.jsx';
import IntraLUcontest from './Pages/Dashboard/intra-lu-contest/IntraLUcontest.jsx';
import LUPSmarathonContest from './Pages/Dashboard/lu-problemsolver-marathon-contest/LUPSmarathonContest.jsx';
import LUPSshortContest from './Pages/Dashboard/lu-problemsolver-short-contest/LUPSshortContest.jsx';
import PrivateOutlet from './components/PrivateOutlet.jsx';
import UserGuide from './Pages/Dashboard/user-guide/UserGuide.jsx';
import UpcomingContest from './Pages/Dashboard/upcoming-contest/UpcomingContest.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

function App() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            neutral: {
                main: '#18181b',
                contrastText: '#fff',
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <ScrollToTop>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route element={<PrivateOutlet />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/dashboard/topic-wise"
                                element={<Topics />}
                            />
                            <Route
                                path={'/dashboard/topic-wise/:topicProblems'}
                                element={<TopicProblem />}
                            />
                            <Route
                                path={'/dashboard/codeforces-ladder'}
                                element={<CFladder />}
                            />
                            <Route
                                path={'/dashboard/codeforces-ladder/:ladder'}
                                element={<CFladderProblems />}
                            />
                            <Route
                                path={'/dashboard/intra-lu-contest'}
                                element={<IntraLUcontest />}
                            />
                            <Route
                                path={
                                    '/dashboard/lu-problemsolver-marathon-contest'
                                }
                                element={<LUPSmarathonContest />}
                            />
                            <Route
                                path={'/dashboard/lu-problemsolver-short-contest'}
                                element={<LUPSshortContest />}
                            />
                            <Route
                                path={'/dashboard/user-guide'}
                                element={<UserGuide />}
                            />
                            <Route
                                path={'/dashboard/upcoming-contest'}
                                element={<UpcomingContest />}
                            />
                        </Route>
                    </Routes>
                </ScrollToTop>
            </Router>
        </ThemeProvider>
    );
}

export default App;
