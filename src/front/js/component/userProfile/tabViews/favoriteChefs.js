import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export const FavoriteChefs = ({ store, actions, isProfile }) => {
  useEffect(() => {
    if (!store.usuariosFavoritos || store.usuariosFavoritos.length === 0) {
      actions.getUserFavorites();
    }
  }, [store.usuariosFavoritos, actions]);

  return (
    <>
    {isProfile && (
    <div className="favorite-recipes-section mt-4">
      <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        Chefs Favoritos
      </h3>
      <div className="row justify-content-center">
        {store.usuariosFavoritos && store.usuariosFavoritos.length > 0 ? (
          store.usuariosFavoritos.map((usuario, index) => (
          <Link key={usuario.id} to={`/user/${usuario.id}`} style={{ textDecoration: "none" }}>
            <div
              className="recipe-card col-md-3 bg-light p-2 m-2"
              style={{ width: "23%" }}
              key={usuario.id}
            >
              <p className="recipe-name">
                {usuario.first_name && usuario.last_name
                  ? `${usuario.first_name} ${usuario.last_name}`
                  : usuario.user_name || "Usuario sin nombre"}
              </p>
            </div>
          </Link>

          ))
        ) : (
          <p>No tienes chefs favoritos.</p>
        )}
      </div>
    </div>
    )}
    {!isProfile && (
    <div className="favorite-recipes-section mt-4">
      <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        Chefs Favoritos
      </h3>
      <div className="row justify-content-center">
        {store.usuariosFavoritos && store.usuariosFavoritos.length > 0 ? (
          store.usuariosFavoritos.map((usuario, index) => (
          <Link key={usuario.id} to={`/user/${usuario.id}`} style={{ textDecoration: "none" }}>
            <div
              className="recipe-card col-md-3 bg-light p-2 m-2"
              key={usuario.id}
            >
              <p className="recipe-name">
                {usuario.first_name && usuario.last_name
                  ? `${usuario.first_name} ${usuario.last_name}`
                  : usuario.user_name || "Usuario sin nombre"}
              </p>
            </div>
          </Link>

          ))
        ) : (
          <p>No hay chefs favoritos</p>
        )}
      </div>
    </div>
    )}
    </>
  );
};