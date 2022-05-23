import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import FeatureContests from "../../../components/UpcomingContestComponents/FeatureContests";
import UpcomingOnlineContest from "../../../components/UpcomingContestComponents/UpcomingOnlineContest";
import { LinearProgress, Stack } from "@mui/material";
import axios from "axios";

const UpcomingContest = () => {
    const [codeforcesContests, setCodeforcesContests] = useState({});
    const [atcoderContests, setAtcoderContests] = useState({});
    const [codechefContests, setCodechefContests] = useState({});
    const [allContests, setAllContests] = useState({});

    //getting user
    const currentUserEmail = localStorage.getItem("email");

    //getting codeforces upcoming contests
    const getCodeforcesContest = async () => {
        try {
            axios
                .get(`https://kontests.net/api/v1/codeforces`)
                .then((response) => {
                    response.data.forEach((element) => {
                        element["platform"] = "Codeforces";
                    });
                    setCodeforcesContests(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    //getting atcoder upcoming contests
    const getAtcoderContest = async () => {
        try {
            axios
                .get(`https://kontests.net/api/v1/at_coder`)
                .then((response) => {
                    response.data.forEach((element) => {
                        element["platform"] = "Atcoder";
                    });
                    setAtcoderContests(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    //getting codechef upcoming contests
    const getCodeChefContest = async () => {
        try {
            axios
                .get(`https://kontests.net/api/v1/code_chef`)
                .then((response) => {
                    response.data.forEach((element) => {
                        element["platform"] = "Codechef";
                    });
                    setCodechefContests(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    //concating all contests
    const getAllContest = () => {
        setTimeout(() => {
            let data = Object.assign(
                codeforcesContests,
                codechefContests,
                atcoderContests
            );
            console.log(data);
            setAllContests(data);
        }, "2000");
    };
    getAllContest();

    useEffect(() => {
        (async () => {
            const getCFcontestFunction = await getCodeforcesContest();
            const getACcontestFunction = await getAtcoderContest();
            const getCCcontestFunction = await getCodeChefContest();
            return Promise.all([
                getCFcontestFunction,
                getACcontestFunction,
                getCCcontestFunction,
            ]);
        })();
    });

    return (
        <div>
            <Header />
            <FeatureContests />
            {allContests.length ? (
                <UpcomingOnlineContest allContests={allContests} />
            ) : (
                <Stack sx={{ width: "100%", color: "grey.500" }}>
                    <LinearProgress color="inherit" />
                </Stack>
            )}
        </div>
    );
};

export default UpcomingContest;
