import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get("http://localhost:3001/check", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error(error);
        setAuth(false);
      }
    };

    checkToken();
  }, []);

  console.log(auth);
  return auth ? <h1>Ok</h1>  : <h1>False</h1>
};

export default ProtectedRoutes;




