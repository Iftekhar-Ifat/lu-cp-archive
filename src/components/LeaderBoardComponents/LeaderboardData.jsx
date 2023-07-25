// file name is jsx because using custom jsx inside

import { getRatingColor } from '../Profile/getColors';

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
        accessorKey: 'studentid',
        enableEditing: false,
        header: 'Student ID',
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
        Cell: ({ cell }) => (
            <a
                href={`https://codeforces.com/profile/${cell.getValue()}`}
                target="_blank"
                rel="noreferrer"
                style={{
                    color: `${getRatingColor(cell.row.original.cf_rating)}`,
                }}
            >
                {cell.getValue()}
            </a>
        ),
    },
    {
        accessorKey: 'stopstalk',
        enableEditing: false,
        header: 'Stopstalk',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
        Cell: ({ cell }) => (
            <a
                href={`https://www.stopstalk.com/user/profile/${cell.getValue()}`}
                target="_blank"
                rel="noreferrer"
            >
                {cell.getValue()}
            </a>
        ),
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
        accessorKey: 'studentid',
        enableEditing: false,
        header: 'Student ID',
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
        Cell: ({ cell }) => (
            <a
                href={`https://codeforces.com/profile/${cell.getValue()}`}
                target="_blank"
                rel="noreferrer"
                style={{
                    color: `${getRatingColor(cell.row.original.cf_rating)}`,
                }}
            >
                {cell.getValue()}
            </a>
        ),
    },
    {
        accessorKey: 'stopstalk',
        enableEditing: false,
        header: 'Stopstalk',
        muiTableHeadCellProps: {
            align: 'center',
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
        Cell: ({ cell }) => (
            <a
                href={`https://stopstalk.com/user/profile/${cell.getValue()}`}
                target="_blank"
                rel="noreferrer"
            >
                {cell.getValue()}
            </a>
        ),
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
