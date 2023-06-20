import { useParams } from 'react-router-dom';
import { processCFdata } from '../../../../components/ProcessCFdata';
import DynamicCFproblems from '../../../../components/DynamicCFproblems.jsx';
import axios from 'axios';
import ColdStartNotification from '../../../../components/ColdStartNotification.jsx';
import { useAuth } from '../../../../context/AuthProvider.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getCFproblemsData,
    getUserData,
} from '../../../../components/queries/CFladderProblemsQuery';
import Loading from '../../../../components/Loading';
import { useEffect, useState } from 'react';

const CFladderProblems = () => {
    const [modifiedProblemsData, setModifiedProblemsData] = useState(false);

    const path = useParams();
    const currentUserEmail = useAuth().currentUser.email;
    const queryClient = useQueryClient();

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUserEmail),
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const problems = useQuery({
        queryKey: [`cf-problems-${path.ladder}`],
        queryFn: () => getCFproblemsData(path),
        enabled: userData.isSuccess,
        onSuccess: data => {
            try {
                axios
                    .get(
                        `https://codeforces.com/api/user.status?handle=${userData.data.CFhandle}`
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
            userCFhandle={userData.data.CFhandle}
            problems={problems.data}
            userStatus={userData.data.role}
        />
    );
};

export default CFladderProblems;
