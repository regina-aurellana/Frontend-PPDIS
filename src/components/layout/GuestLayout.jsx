import React from 'react'
import { useAuth } from '../../context/auth'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from './LoadingPage';


const GuestLayout = () => {

  const auth = useAuth();
  const location = useLocation();

  if(auth.loading){
    return <LoadingPage />
  }

  if(auth.is_logged){
      return <Navigate  to='/login'  state={{ from: location }} replace />
  }
  return  <Outlet />

}

export default GuestLayout