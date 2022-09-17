import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticate } from '../auth/index';

const PrivateRoute = () => {
     return isAuthenticate() ? <Outlet/> : <Navigate to="/signin" />
};

export default PrivateRoute;