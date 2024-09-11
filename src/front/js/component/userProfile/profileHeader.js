import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../userProfile/styles.css";

export const ProfileHeader = ({ user, isProfile  }) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getUserRecipes();
  }, []);
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
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
        <div className="d-flex justify-content-between">
          <p>
          {(user.first_name && user.last_name) 
            ? `${capitalizeWords(user.first_name.toLowerCase())} ${capitalizeWords(user.last_name.toLowerCase())}`
            : "Nombre no disponible"}
          </p>
          {!isProfile&&(
            <button>Seguir Chef</button> 
          )}
        </div>
        
        <p>{user.email || "error"}</p>
        <p>{store.recetasSubidas || 0} Recetas subidas</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>
      </div>
    </div>
  );
};