import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  //const jwtToken = useSelector((state) => state.jwtToken.jwtToken);
  const isAuthenticated = useSelector((state) => state.isAuthenticated.isAuthenticated)
  return (
    <>
        {
            isAuthenticated ? (
                <div>
                    {children}
                </div>
            ) :
            (
                <Navigate to="/login"/>
            )
        } 
    </>
  );
};

export default Auth;