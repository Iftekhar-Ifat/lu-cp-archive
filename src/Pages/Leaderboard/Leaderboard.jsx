import { Button } from '@geist-ui/core';
import Save from '@geist-ui/icons/save';
import { Delete } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { leaderboardSave } from '../../components/ApiComponents/handleSaveLeaderboard';
import ColdStartNotification from '../../components/ColdStartNotification';
import {
    leaderboardAdminColumns,
    leaderboardColumns,
} from '../../components/LeaderBoardComponents/LeaderboardData';
import Loading from '../../components/Loading';
import {
    addPerformance,
    generatePoints,
    getUserData,
    showPrevPerformance,
    sortAndAddRank,
} from '../../components/queries/LeaderboardQuery';
import { useAuth } from '../../context/AuthProvider';
import styles from '../../styles/Leaderboard/Leaderboard.module.css';

const API = import.meta.env.VITE_BACKEND_API;

const Leaderboard = () => {
    const currentUser = useAuth().currentUser;
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [prevLeaderboard, setPrevLeaderboard] = useState([]); // storing a deep copy of the current leaderboard
    const [recentGeneration, setRecentGeneration] = useState(false);

    const columns = useMemo(() => leaderboardColumns, []);
    const adminColumns = useMemo(() => leaderboardAdminColumns, []);

    const userData = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(currentUser.email),
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const handleGenerateLeaderboard = async () => {
        try {
            setIsLoading(true);

            const generatedLeaderboardData = await generatePoints();
            const performanceAddedLeaderboard = await showPrevPerformance(
                generatedLeaderboardData,
                leaderboard
            );
            const sortedLeaderboard = await sortAndAddRank(
                performanceAddedLeaderboard
            );
            setLeaderboard([...sortedLeaderboard]); //re-render with new data
            setRecentGeneration(true);

            setIsLoading(false);
        } catch (error) {
            alert('Codeforces API is currently down. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleSaveLeaderboard = async () => {
        try {
            setIsSaving(true);
            const performanceAddedLeaderboard = await addPerformance(
                prevLeaderboard,
                leaderboard,
                recentGeneration
            );
            if (typeof performanceAddedLeaderboard === 'object') {
                const sortedLeaderboard = await sortAndAddRank(
                    performanceAddedLeaderboard
                );
                await leaderboardSave({
                    email: currentUser.email,
                    leaderboard: sortedLeaderboard,
                });
                setPrevLeaderboard(JSON.parse(JSON.stringify(leaderboard)));
            } else {
                alert(performanceAddedLeaderboard);
            }
            setIsSaving(false);
        } catch (error) {
            alert('Something went wrong!');
            setIsSaving(false);
        }
    };

    const handleSaveCell = (cell, value) => {
        leaderboard[cell.row.index][cell.column.id] = Number(value);
        setLeaderboard([...leaderboard]);
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
            leaderboard.splice(row.index, 1);
            setLeaderboard([...leaderboard]);
        },
        [leaderboard]
    );

    useEffect(() => {
        // Function to be executed in the first render
        const getLeaderboardData = async () => {
            const leaderboardAPI = `${API}/leaderboard`;
            try {
                const result = await axios.get(leaderboardAPI);
                setPrevLeaderboard(
                    JSON.parse(JSON.stringify(result.data[0].leaderboard))
                );
                setLeaderboard(result.data[0].leaderboard);
            } catch (error) {
                console.error('Error:', error.message);
                throw error;
            }
        };

        getLeaderboardData();
    }, []);

    if (userData.isLoading) {
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
            <MaterialReactTable
                columns={
                    userData.data?.role === 'power' ? adminColumns : columns
                }
                data={leaderboard}
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableEditing={userData.data?.role === 'power' ? true : false}
                enableRowActions={
                    userData.data?.role === 'power' ? true : false
                }
                editingMode="cell"
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
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
                muiTableBodyCellEditTextFieldProps={({ cell }) => ({
                    //onBlur is more efficient, but could use onChange instead
                    onBlur: event => {
                        handleSaveCell(cell, event.target.value);
                    },
                })}
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
                        marginBottom: '2em',
                    },
                }}
                defaultColumn={{
                    maxSize: 400,
                    minSize: 80,
                    size: 80, //default size is usually 180
                }}
            />
            {userData.data?.role === 'power' ? (
                <div className={styles.btn_container}>
                    <Button
                        className={styles.btn_style}
                        type="secondary"
                        ghost
                        loading={isLoading}
                        auto
                        scale={2}
                        onClick={handleGenerateLeaderboard}
                    >
                        Generate Leaderboard
                    </Button>

                    <Button
                        className={styles.btn_style}
                        type="secondary"
                        ghost
                        icon={<Save />}
                        loading={isSaving}
                        auto
                        scale={2}
                        onClick={handleSaveLeaderboard}
                    >
                        Save
                    </Button>
                </div>
            ) : null}
            <div className={styles.footer}>
                <i>
                    The algorithm to generate rating is maintained by{' '}
                    <b>LU ACM.</b>
                </i>
            </div>
        </div>
    );
};

export default Leaderboard;
