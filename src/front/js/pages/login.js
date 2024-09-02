import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  const onSubmitHandler = async (e) => {
    // 4.- Sobreescribir el comportamiento "nativo" del formulario (refrescar la página)
    e.preventDefault();
    // 5.- Realizar accion de submit
    const logged = await actions.login(email, password);
    if (logged) {
      navigate(`/`);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <main className="container w-25 border border-primary">
      <h1 className="text-center">LOGIN</h1>
      <form onSubmit={onSubmitHandler}>
      <div className="mb-3">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder="example@gmail.com"
              />
        </div>
        <div className="mb-3">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="********"
              />
        </div >
        <div className="text-center m-1">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
};