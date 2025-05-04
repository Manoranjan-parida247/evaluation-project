import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated  = true;
    return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute;
