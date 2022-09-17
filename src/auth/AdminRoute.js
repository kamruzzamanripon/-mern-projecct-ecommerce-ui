import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticate } from '../auth/index';

const AdminPrivateRoute = () => {
     return isAuthenticate() && isAuthenticate().user.role == 1  ? <Outlet/> : <Navigate to="/signin" />
};

export default AdminPrivateRoute;