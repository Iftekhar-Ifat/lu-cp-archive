import React, { useEffect, useState } from "react";
import UpcomingOnlineContest from "../../../components/UpcomingContestComponents/UpcomingOnlineContest";
import { LinearProgress, Stack } from "@mui/material";
import axios from "axios";

const UpcomingContest = () => {
    const [allContests, setAllContests] = useState({});

    //getting upcoming contest data
    const fetchContestData = async () => {
        const codeforcesContestAPI = "https://kontests.net/api/v1/codeforces";
        const codechefContestAPI = "https://kontests.net/api/v1/code_chef";
        const atcoderContestAPI = "https://kontests.net/api/v1/at_coder";

        try {
            const getCodeforcesContest = axios.get(codeforcesContestAPI);
            const getCodechefContest = axios.get(codechefContestAPI);
            const getAtcoderContest = axios.get(atcoderContestAPI);
            axios
                .all([
                    getCodeforcesContest,
                    getCodechefContest,
                    getAtcoderContest,
                ])
                .then(
                    axios.spread((...fetchedContest) => {
                        let allContestData = [];
                        let counter = 1;
                        fetchedContest.forEach((element) => {
                            if (counter === 1) {
                                element.data.forEach((contest) => {
                                    contest["platform"] = "Codeforces";
                                });
                            } else if (counter === 2) {
                                element.data.forEach((contest) => {
                                    contest["platform"] = "Codechef";
                                });
                            } else {
                                element.data.forEach((contest) => {
                                    contest["platform"] = "Atcoder";
                                });
                            }
                            counter++;
                            allContestData.push(...element.data);
                        });
                        allContestData.sort(
                            (a, b) =>
                                new Date(a.start_time).getTime() -
                                new Date(b.start_time).getTime()
                        );
                        setAllContests(allContestData);
                    })
                );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            const getContestData = await fetchContestData();
            return Promise.all([getContestData]);
        })();
    }, []);

    return (
        <div>
            {allContests.length ? (
                <UpcomingOnlineContest allContests={allContests} />
            ) : (
                <>
                    <Stack sx={{ width: "100%", color: "grey.500" }}>
                        <LinearProgress color="inherit" />
                    </Stack>
                </>
            )}
        </div>
    );
};

export default UpcomingContest;
