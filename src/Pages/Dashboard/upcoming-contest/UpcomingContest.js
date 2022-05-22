import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import FeatureContests from "../../../components/UpcomingContestComponents/FeatureContests";
import UpcomingOnlineContest from "../../../components/UpcomingContestComponents/UpcomingOnlineContest";
import axios from "axios";

const UpcomingContest = () => {
    const [codeforcesContests, setCodeforcesContests] = useState({});
    const [atcoderContests, setAtcoderContests] = useState({});
    const [codechefContests, setCodechefContests] = useState({});

    //getting user
    const currentUserEmail = localStorage.getItem("email");

    //getting codeforces upcoming contests
    const getCodeforcesContest = async () => {
        try {
            axios
                .get(`https://kontests.net/api/v1/codeforces`)
                .then((response) => {
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
                    setCodechefContests(response.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        (async () => {
            const getCFcontestFunction = getCodeforcesContest();
            const getACcontestFunction = getAtcoderContest();
            const getCCcontestFunction = getCodeChefContest();
            return Promise.all([
                getCFcontestFunction,
                getACcontestFunction,
                getCCcontestFunction,
            ]);
        })();
    }, [currentUserEmail]);

    return (
        <div>
            <Header />
            <FeatureContests />
            {codeforcesContests.length ||
            codechefContests.length ||
            atcoderContests.length ? (
                <UpcomingOnlineContest
                    codeforcesContests={codeforcesContests}
                    atcoderContests={atcoderContests}
                    codechefContests={codechefContests}
                />
            ) : null}
        </div>
    );
};

export default UpcomingContest;
