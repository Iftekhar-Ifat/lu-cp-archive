import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColdStartNotification from '../../../../components/ColdStartNotification.jsx';
import DynamicCFproblems from '../../../../components/DynamicCFproblems.jsx';
import Loading from '../../../../components/Loading';
import { processCFdata } from '../../../../components/ProcessCFdata';
import {
    getCFproblemsData,
    getUserData,
} from '../../../../components/queries/CFladderProblemsQuery';
import { useAuth } from '../../../../context/AuthProvider.jsx';

const CFladderProblems = () => {
    const [modifiedProblemsData, setModifiedProblemsData] = useState(false);

    const path = useParams();
    const currentUserEmail = useAuth().currentUser.email;
    const queryClient = useQueryClient();

    const userData = useQuery({
        queryKey: ['userData-cf-ladder'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const problems = useQuery({
        queryKey: [`cf-problems-${path.ladder}`],
        queryFn: () => getCFproblemsData(path),
        enabled: userData.isSuccess,
        onSuccess: data => {
            if (userData.data.userHandle?.trim() !== '') {
                try {
                    axios
                        .get(
                            `https://codeforces.com/api/user.status?handle=${userData.data.userHandle}`
                        )
                        .then(response => {
                            if (response.data.status === 'OK') {
                                const modifiedProblemData = processCFdata(
                                    response.data,
                                    data
                                );
                                queryClient.setQueryData(
                                    [`cf-problems-${path.ladder}`],
                                    modifiedProblemData
                                );
                                setModifiedProblemsData(true);
                            }
                        });
                } catch (err) {
                    console.log(err.message);
                }
            }
        },
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (modifiedProblemsData === true) {
            setModifiedProblemsData(false);
        }
    }, [modifiedProblemsData]);

    if (userData.isLoading || problems.isLoading) {
        return (
            <>
                <Loading />
                <ColdStartNotification />
            </>
        );
    }

    return (
        <DynamicCFproblems
            userCFhandle={userData.data.userHandle}
            problems={problems.data}
            userStatus={userData.data.userRole}
        />
    );
};

export default CFladderProblems;
