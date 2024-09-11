import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const OtherUserHeader = ({ user }) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getUserRecipes();
    actions.getOtherUserRecipes(user.id)
  }, [user.id]);
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  const recetasSubidas = Array.isArray(store.listaDeRecetasDeOtroUsuario)
    ? store.listaDeRecetasDeOtroUsuario.filter((receta) => receta.uploaded_by_user?.id === user.id)
    : [];

  return (
    <div className="navbar-profile d-flex justify-content-between align-items-center p-3 bg-light">
      <div className="profile-photo text-center col-3 p-1">
        <img
          src="https://via.placeholder.com/150"
          alt="Foto de perfil"
          className="img-fluid rounded-circle"
        />
        <p>{user.user_name || "error"}</p>
      </div>
      <div className="profile-info col-5 p-1">
        <p>
          {(user.first_name && user.last_name) 
            ? `${capitalizeWords(user.first_name.toLowerCase())} ${capitalizeWords(user.last_name.toLowerCase())}`
            : "error"}
        </p>
        <p>{user.email || "error"}</p>
        <p>{recetasSubidas.length} Recetas subidas</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>
      </div>
    </div>
  );
};