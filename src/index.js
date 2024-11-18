import React from "react";
import {  RouterProvider } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import "./index.css";
import  router  from "./utilities/router"
import { AuthProvider } from "./context/auth";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
