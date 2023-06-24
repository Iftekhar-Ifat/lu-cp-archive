import { useMemo, useState } from 'react';
import styles from '../../styles/Leaderboard/Leaderboard.module.css';
import { MaterialReactTable } from 'material-react-table';
import {
    leaderboardColumns,
    leaderboardData,
} from '../../components/LeaderBoardComponents/LeaderboardData';
import { useAuth } from '../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import {
    generatePoints,
    getUserData,
} from '../../components/queries/LeaderboardQuery';
import { Button } from '@geist-ui/core';

const Leaderboard = () => {
    const currentUser = useAuth().currentUser;
    const [isLoading, setIsLoading] = useState(false);

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUser.email),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const columns = useMemo(() => leaderboardColumns, []);

    const handleGenerateLeaderboard = async () => {
        setIsLoading(true);
        console.log(await generatePoints());
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header_div}>
                <h1 className={styles.header_style}>
                    <u>Programmer&apos;s Leaderboard</u>
                </h1>
            </div>
            <MaterialReactTable
                columns={columns}
                data={leaderboardData}
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                muiTableHeadCellProps={{
                    sx: {
                        fontWeight: 'bold',
                        fontSize: '22px',
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        fontSize: '18px',
                    },
                }}
                muiTableContainerProps={{
                    sx: {
                        maxHeight: 'none',
                        marginBottom: '20px',
                    },
                }}
            />
            {userData.isSuccess && userData.data.role === 'power' ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="secondary"
                        ghost
                        loading={isLoading}
                        auto
                        scale={2}
                        onClick={handleGenerateLeaderboard}
                    >
                        Generate Leaderboard
                    </Button>
                </div>
            ) : null}

            <div className={styles.footer}>
                <i>The algorithm to generate rating is maintained by LU ACM</i>
            </div>
        </div>
    );
};

export default Leaderboard;
