import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Sign_in = () => {
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const registered = await actions.registerUser(user_name, email, password);
    if (registered) {
      alert("¡Usuario creado exitosamente!");
      navigate("/login"); // Redirigir después del registro exitoso
    } else {
      alert("Error al crear el usuario. Por favor, intenta de nuevo.");
    }
  };

  return (
    <main className="container w-25 border border-primary">
      <h1 className="text-center">REGISTRARSE</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="inputUserName" className="col-sm-2 col-form-label">
              Nombre de usuario
            </label>
            <input
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="form-control"
              id="inputUserName"
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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