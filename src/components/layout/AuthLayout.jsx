import React, { useEffect } from 'react'
import { useAuth } from '../../context/auth'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from './LoadingPage';


const AuthLayout = () => {

  const auth = useAuth();
  const location = useLocation();


  if(auth.loading){
    return <LoadingPage />
  }

  return  <Outlet />

}

export default AuthLayout