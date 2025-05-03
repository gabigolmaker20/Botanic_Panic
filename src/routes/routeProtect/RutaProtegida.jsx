import React from 'react'
import { authUsers } from '../../zustand/authUsers';
import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = () => {

    const { user, isAuthentication } = authUsers();

    if(!isAuthentication && !user){
        return <Navigate to="/" replace />;
    }

  return <Outlet />;
}

export default RutaProtegida