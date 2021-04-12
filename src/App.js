import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap"
import SignInSignUp from "./page/SignInSignUp";
import { AuthContext } from "./utils/context"
import { isUserLoggedApi } from "./api/auth"
import Routing from "./routes/Routing";

import { ToastContainer } from "react-toastify";




export default function App() {

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false)
  const [refresCheckLogin, setRefresCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLoggedApi());
    setRefresCheckLogin(false)
    setLoadUser(true)
  }, [refresCheckLogin])

  if(!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? <Routing setRefresCheckLogin={setRefresCheckLogin} />: <SignInSignUp setRefresCheckLogin={setRefresCheckLogin}/>}
      <ToastContainer 
        positionToast="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover     
      />
    </AuthContext.Provider>
  )
}

