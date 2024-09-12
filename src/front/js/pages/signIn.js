import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { SignIn } from '../component/singIn/';

export const SignInView = () => {
  const { store, actions } = useContext(Context);
  return (
    <SignIn user={store.currentUser} />
  );
};