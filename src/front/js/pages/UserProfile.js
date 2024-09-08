import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/stylesUserProfile.css";
import { Context } from "../store/appContext";

export const UserProfile = () => {
  const { store } = useContext(Context);
  const withSession = !!store?.isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!withSession) {
      navigate("/login");
    }
  }, [withSession]);

  const handleEditProfile = () => {
    console.log("Editar perfil");
  };

  if (!store.currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className="container profile-container"
      style={{ position: "relative" }}
    >
      <div className="navbar-profile d-flex justify-content-between align-items-center p-3 bg-light">
        <div className="profile-photo text-center col-3 p-1">
          <img
            src="https://via.placeholder.com/150"
            alt="Foto de perfil"
            className="img-fluid rounded-circle"
          />
          <p>{store.currentUser.user_name || "error"}</p>
        </div>
        <div className="profile-info col-5 p-1">
          <p>{store.currentUser.name || "error"}</p>
          <p>{store.currentUser.email || "error"}</p>
          <p>5 Recetas subidas</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>
        </div>
      </div>

      {/* Botones en una sola línea */}
      <div className="d-flex justify-content-around">
        <button
          className="btn-custom"
          onClick={handleEditProfile}
          style={{ width: "20%" }}
        >
          Editar Perfil
        </button>
        <button className="btn-custom" style={{ width: "20%" }}>
          Chefs Favoritos
        </button>
        <button className="btn-custom" style={{ width: "20%" }}>
          Recetas Favoritas
        </button>
        <button className="btn-custom" style={{ width: "20%" }}>
          Mis Recetas
        </button>
        <button className="btn-custom" style={{ width: "20%" }}>
          Chats
        </button>
      </div>

      <div className="recipes-section mt-4">
        <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
          Mis recetas
        </h3>
        <div className="row">
          <div className="recipe-card col-md-3 bg-light p-2">
            <img
              src="https://via.placeholder.com/100"
              alt="Receta"
              className="img-fluid"
            />
            <p className="recipe-name">Nombre Receta</p>
          </div>
        </div>
      </div>

      <button
        className="btn-custom"
        onClick={handleEditProfile}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
      >
        Editar perfil
      </button>
    </div>
  );
};
