import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Context } from "../../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  actions } = useContext(Context);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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