import { useMemo } from 'react';
import styles from '../../styles/Leaderboard/Leaderboard.module.css';
import { MaterialReactTable } from 'material-react-table';
const Leaderboard = () => {
    // const demoItems = [
    //     {
    //         name: 'Iftekhar Ahmed',
    //         handles: [
    //             {
    //                 platform: 'codeforces',
    //                 handle: 'ryu',
    //             },
    //             {
    //                 platform: 'codechef',
    //                 handle: 'ryu2',
    //             },
    //         ],
    //     },
    // ];

    const data = [
        {
            firstName: 'Dylan',
            lastName: 'Murray',
            email: 'dmurray@yopmail.com',
            city: 'East Daphne',
        },
        {
            firstName: 'Raquel',
            lastName: 'Kohler',
            email: 'rkholer33@yopmail.com',
            city: 'Columbus',
        },
        {
            firstName: 'Ervin',
            lastName: 'Reinger',
            email: 'ereinger@mailinator.com',
            city: 'South Linda',
        },
        {
            firstName: 'Brittany',
            lastName: 'McCullough',
            email: 'bmccullough44@mailinator.com',
            city: 'Lincoln',
        },
        {
            firstName: 'Branson',
            lastName: 'Frami',
            email: 'bframi@yopmain.com',
            city: 'New York',
        },
        {
            firstName: 'Kevin',
            lastName: 'Klein',
            email: 'kklien@mailinator.com',
            city: 'Nebraska',
        },
        {
            firstName: 'Dylan',
            lastName: 'Murray',
            email: 'dmurray@yopmail.com',
            city: 'East Daphne',
        },
    ];

    const columns = useMemo(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'city',
                header: 'City',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
        ],
        []
    );

    return (
        <div className={styles.container}>
            <div className={styles.header_div}>
                <h1 className={styles.header_style}>
                    <u>Programmer&apos;s Leaderboard</u>
                </h1>
            </div>
            <MaterialReactTable
                columns={columns}
                data={data}
                enableStickyHeader
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                muiTableHeadCellProps={{
                    //simple styling with the `sx` prop, works just like a style prop in this example
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
            <div className={styles.footer}>
                <i>The algorithm to generate rating is maintained by LU ACM</i>
            </div>
        </div>
    );
};

export default Leaderboard;
