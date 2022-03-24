import React from "react";
import Homepage from "./Pages/Homepage/Homepage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topics from "./Pages/Dashboard/topic-wise/Topics";
import TopicItems from "./Pages/Dashboard/topic-wise/topic-items/TopicItems";
import TopicProblem from "./Pages/Dashboard/topic-wise/topic-items/topic-problem/TopicProblem";
import AuthProvider from "../src/context/AuthProvider";
import CFladder from "./Pages/Dashboard/cf-ladder/CFladder";
import CFladderProblems from "./Pages/Dashboard/cf-ladder/cf-ladder-problems/CFladderProblems";
import IntraLUcontest from "./Pages/Dashboard/intra-lu-contest/IntraLUcontest";
import LUPSmarathonContest from "./Pages/Dashboard/lu-problemsolver-marathon-contest/LUPSmarathonContest";
import LUPSshortContest from "./Pages/Dashboard/lu-problemsolver-short-contest/LUPSshortContest";
import ComingSoon from "./Pages/Dashboard/coming-soon/ComingSoon";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/topic-wise" element={<Topics />} />
                    <Route
                        path={"/dashboard/topic-wise/:topicItem"}
                        element={<TopicItems />}
                    />
                    <Route
                        path={"/dashboard/topic-wise/:topicItem/:topicProblems"}
                        element={<TopicProblem />}
                    />
                    <Route
                        path={"/dashboard/codeforces-ladder"}
                        element={<CFladder />}
                    />
                    <Route
                        path={"/dashboard/codeforces-ladder/:ladder"}
                        element={<CFladderProblems />}
                    />
                    <Route
                        path={"/dashboard/intra-lu-contest"}
                        element={<IntraLUcontest />}
                    />
                    <Route
                        path={"/dashboard/lu-problemsolver-marathon-contest"}
                        element={<LUPSmarathonContest />}
                    />
                    <Route
                        path={"/dashboard/lu-problemsolver-short-contest"}
                        element={<LUPSshortContest />}
                    />
                    <Route
                        path={"/dashboard/coming-soon-..."}
                        element={<ComingSoon />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
