import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export const FavoriteChefs = ({ isProfile, visitedUser }) => {
  return (
    <>
      {isProfile && (
        <div className="favorite-chefs-section mt-4">
          <h3>
            Chefs Favoritos
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {store.usuariosFavoritos && store.usuariosFavoritos.length > 0 ? (
              store.usuariosFavoritos.map((usuario, index) => (
                <Link
                  key={usuario.id}
                  to={`/user/${usuario.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="recipe-card col-md-3 p-2 m-2">
                    <img
                      src={usuario.profile_image}
                      alt="Receta"
                      className="img-fluid"
                    />
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
      {!isProfile && visitedUser && Array.isArray(visitedUser.uploaded_recipes) && (
        <div className="favorite-chefs-section mt-4">
          <h3>
            Chefs Favoritos
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {visitedUser.favorite_users && visitedUser.favorite_users.length > 0 ? (
              visitedUser.favorite_users.map((usuario) => (
                <Link
                  key={usuario.id}
                  to={`/user/${usuario.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="recipe-card col-md-3 p-2 m-2">
                    <img
                      src={usuario.profile_image}
                      alt="Receta"
                      className="img-fluid"
                    />
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
