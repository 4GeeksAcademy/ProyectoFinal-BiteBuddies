import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from '../component/logIn/index';

export const LoginView = () => {
  const { store} = useContext(Context);
  const navigate = useNavigate();
  return (
    <Login user={store.currentUser} />
  );
};