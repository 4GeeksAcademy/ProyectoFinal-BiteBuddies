import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "./styles.css";

export const SignIn = () => {
  const [user_name, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const registered = await actions.registerUser(user_name, first_name, last_name, email, password);
    if (registered) {
      alert("¡¡Usuario creado exitosamente!!");
      navigate("/login");
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
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="mb-3 input-container">
            <input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control input"
              id="inputFirstName"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-3 input-container">
            <input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control input"
              id="inputLastName"
              placeholder="Apellidos"
            />
          </div>
          <div className="mb-3 input-container">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control input"
              id="inputEmail"
              placeholder="Email"
            />
          </div>
          <div className="mb-3 input-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control input"
              id="inputPassword"
              placeholder="Contraseña"
            />
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