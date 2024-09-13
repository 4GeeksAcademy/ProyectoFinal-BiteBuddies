import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Context } from "../../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const isMounted = useRef(true); // Usamos useRef para controlar si el componente está montado

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const logged = await actions.login(email, password);
    if (isMounted.current && logged) { // Verificamos si el componente sigue montado antes de navegar
      navigate(`/`);
    }
    if (isMounted.current) {
      setEmail("");
      setPassword("");
    }
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
            placeholder="Email"
          />
        </div>
        <div className="input-container">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input"
            id="inputPassword"
            placeholder="Contraseña "
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn-primary">Entrar</button>
        </div>
      </form>
    </main>
  );
};
