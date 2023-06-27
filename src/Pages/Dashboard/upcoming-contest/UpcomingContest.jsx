import UpcomingOnlineContest from '../../../components/UpcomingContestComponents/UpcomingOnlineContest.jsx';
import fetchContestData from '../../../components/queries/UpcomingContestQuery.js';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading.jsx';

const UpcomingContest = () => {
    const allContests = useQuery({
        queryKey: ['allContests'],
        queryFn: fetchContestData,
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    if (allContests.isLoading) {
        return <Loading />;
    }

    if (allContests.isError) {
        return <div>Something went wrong!!</div>;
    }

    return <UpcomingOnlineContest allContests={allContests.data} />;
};

export default UpcomingContest;
