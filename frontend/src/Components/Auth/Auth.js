import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  
  return (
    <>
        {
            jwtToken ? (
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