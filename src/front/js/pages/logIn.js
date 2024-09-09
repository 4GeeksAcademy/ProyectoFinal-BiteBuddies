import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"
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
    <main className="main-container">
  <h1 className="text-center">LOGIN</h1>
  <form onSubmit={onSubmitHandler}>
    <div className="input-container">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="input"
        id="inputEmail"
        placeholder=" "
      />
      <label htmlFor="inputEmail" className="floating-label">Email</label>
    </div>
    <div className="input-container">
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="input"
        id="inputPassword"
        placeholder=" "
      />
      <label htmlFor="inputPassword" className="floating-label">Password</label>
    </div>
    <div className="text-center">
      <button type="submit" className="btn-primary">Entrar</button>
    </div>
  </form>
</main>
  );
};