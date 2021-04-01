import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap"
import SignInSignUp from "./page/SignInSignUp";

import { ToastContainer } from "react-toastify";




export default function App() {

  const [user, setUser] = useState({
    name: "Edgar"
  });

  return (
    <div>
      {user ? (
        <div>
          <SignInSignUp />
        </div>
      ) : (
        <h1>No Estas logueado</h1>
      )}
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
    </div>
  )
}

