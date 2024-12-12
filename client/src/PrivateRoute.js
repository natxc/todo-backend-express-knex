import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
    console.log('User in PrivateRoute:', user);
    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
