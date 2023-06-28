import { useCallback, useMemo, useState } from 'react';
import styles from '../../styles/Leaderboard/Leaderboard.module.css';
import { MaterialReactTable } from 'material-react-table';
import { leaderboardColumns } from '../../components/LeaderBoardComponents/LeaderboardData';
import { useAuth } from '../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import {
    generatePoints,
    getLeaderboardData,
    getUserData,
    sortAndAddRank,
} from '../../components/queries/LeaderboardQuery';
import { Button } from '@geist-ui/core';
import Save from '@geist-ui/icons/save';
import { leaderboardSave } from '../../components/ApiComponents/handleSaveLeaderboard';
import Loading from '../../components/Loading';
import ColdStartNotification from '../../components/ColdStartNotification';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Leaderboard = () => {
    const currentUser = useAuth().currentUser;
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState([]);

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUser.email),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const leaderboardData = useQuery({
        queryKey: ['leaderboard'],
        queryFn: getLeaderboardData,
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const columns = useMemo(() => leaderboardColumns, []);

    const handleGenerateLeaderboard = async () => {
        try {
            setIsLoading(true);
            const fetchedLeaderboardData = await generatePoints();
            const currentLeaderboardData = sortAndAddRank(
                fetchedLeaderboardData
            );
            setFetchedLeaderboard(currentLeaderboardData);
            setIsLoading(false);
        } catch (error) {
            alert('Codeforces API is currently down. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleSaveLeaderboard = async () => {
        setIsSaving(true);
        await leaderboardSave(fetchedLeaderboard);
        setIsSaving(false);
    };
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        fetchedLeaderboard[row.index] = values;

        // Sort the array in decreasing order based on "point"
        fetchedLeaderboard.sort((a, b) => b.point - a.point);

        // Add rank number to each object
        fetchedLeaderboard.forEach((obj, index) => {
            obj.rank = index + 1;
        });

        setFetchedLeaderboard([...fetchedLeaderboard]);

        exitEditingMode(); //required to exit editing mode and close modal
    };

    const handleDeleteRow = useCallback(
        row => {
            if (
                !confirm(
                    `Are you sure you want to delete ${row.getValue('name')}`
                )
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            fetchedLeaderboard.splice(row.index, 1);
            setFetchedLeaderboard([...fetchedLeaderboard]);
        },
        [fetchedLeaderboard]
    );

    if (leaderboardData.isLoading) {
        return (
            <>
                <Loading />;
                <ColdStartNotification />
            </>
        );
    }
    return (
        <div className={styles.container}>
            <div className={styles.header_div}>
                <h1 className={styles.header_style}>
                    <u>Programmer&apos;s Leaderboard</u>
                </h1>
            </div>
            {}
            <MaterialReactTable
                columns={columns}
                data={leaderboardData.data.leaderboard}
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

            {fetchedLeaderboard.length ? (
                <div>
                    <MaterialReactTable
                        columns={columns}
                        data={fetchedLeaderboard}
                        enableEditing={true}
                        onEditingRowSave={handleSaveRowEdits}
                        enableColumnActions={false}
                        enableColumnFilters={false}
                        enablePagination={false}
                        enableSorting={false}
                        enableBottomToolbar={false}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton
                                        onClick={() => table.setEditingRow(row)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteRow(row)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        ren
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

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="secondary"
                            ghost
                            icon={<Save />}
                            loading={isSaving}
                            auto
                            scale={1}
                            onClick={handleSaveLeaderboard}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ) : null}

            <div className={styles.footer}>
                <i>The algorithm to generate rating is maintained by LU ACM</i>
            </div>
        </div>
    );
};

export default Leaderboard;
