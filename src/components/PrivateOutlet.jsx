import React, { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const PrivateOutlet = () => {
    const user = useAuth();
    let userExist = user.currentUser;
    return <Fragment>{userExist ? <Outlet /> : <Navigate to="/" />}</Fragment>;
};

export default PrivateOutlet;
