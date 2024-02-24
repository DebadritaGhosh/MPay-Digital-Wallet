// Importing libraries
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Importing constants
import routeNames from '../constants/routeNames';


function AuthRoute({token}) {
	// const { user } = useSelector((state) => state.user);

    if (!token) {
        return <Outlet />;
    }
    return <Navigate replace to={routeNames.DASHBOARD} />;
}

export default AuthRoute;