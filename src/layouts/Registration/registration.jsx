/** @format */

import React, { Children } from "react";
import logo from "../../assets/logo-black.png";
import "./registration.css";
export default function UserAuth({ children }) {
  return (
    <>
      <div className='login-container'>
        <img src={logo} alt='logo' className='signup-logo' width={50} />
        {children}
      </div>
    </>
  );
}
