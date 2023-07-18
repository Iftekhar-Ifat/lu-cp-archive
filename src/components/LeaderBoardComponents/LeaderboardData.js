const leaderboardColumns = [
    {
        accessorKey: 'rank',
        enableEditing: false,
        header: 'Rank',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'name',
        enableEditing: false,
        header: 'Name',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'codeforces',
        enableEditing: false,
        header: 'Codeforces',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'point',
        header: 'Points',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
];

const leaderboardAdminColumns = [
    {
        accessorKey: 'rank',
        enableEditing: false,
        header: 'Rank',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'name',
        enableEditing: false,
        header: 'Name',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'codeforces',
        enableEditing: false,
        header: 'Codeforces',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'performance',
        header: 'Performance',
        muiTableBodyCellEditTextFieldProps: {
            required: true,
            type: 'number',
        },
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'point',
        header: 'Points',
        enableEditing: false,
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
];

export { leaderboardAdminColumns, leaderboardColumns };
