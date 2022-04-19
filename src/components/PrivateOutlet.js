import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
    const userExist = localStorage.getItem("email");
    return <Fragment>{userExist ? <Outlet /> : <Navigate to="/" />}</Fragment>;
};

export default PrivateOutlet;
