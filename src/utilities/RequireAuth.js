import React from 'react'
import { useAuth } from '../context/auth'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from '../components/layout/LoadingPage';


const RequireAuth = () => {

  const auth = useAuth();
  const location = useLocation();
  if(auth.loading){
    return <LoadingPage />
  }
  if(auth.is_logged){
      return  <Outlet />
  }
 return <Navigate  to='/login'  state={{ from: location }} replace />
}

export default RequireAuth