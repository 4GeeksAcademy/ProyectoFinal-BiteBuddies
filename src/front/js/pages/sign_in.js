import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/singIn.css";

export const Sign_in = () => {
  const [user_name, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const registered = await actions.registerUser(user_name, name, email, password);
    if (registered) {
      alert("¡Usuario creado exitosamente!");
      navigate("/login"); // Redirigir después del registro exitoso
    } else {
      alert("Error al crear el usuario. Por favor, intenta de nuevo.");
    }
  };

  return (
    <main className="main-container"> 
      <h1 className="text-center">REGISTRARSE</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="container">
          <div className="mb-3 input-container">
            <input
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="form-control input"
              id="inputUserName"
              placeholder=" "
            />
            <label htmlFor="inputUserName" className="floating-label">Nombre de usuario</label>
          </div>
          <div className="mb-3 input-container">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control input"
              id="inputName"
              placeholder=" "
            />
            <label htmlFor="inputName" className="floating-label">Nombre y apellidos</label>
          </div>
          <div className="mb-3 input-container">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control input"
              id="inputEmail"
              placeholder=" "
            />
            <label htmlFor="inputEmail" className="floating-label">Email</label>
          </div>
          <div className="mb-3 input-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control input"
              id="inputPassword"
              placeholder=" "
            />
            <label htmlFor="inputPassword" className="floating-label">Password</label>
          </div>
          <div className="text-center m-1">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
          {store.error && <div className="text-danger text-center">{store.error}</div>}
        </div>
      </form>
    </main>
  );
};