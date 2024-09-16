import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export const FavoriteChefs = ({ isProfile, visitedUser, store }) => {
  const listaUsuarios = store.listaDeUsuarios;    
  return (
    <>
      {isProfile && (
        <div className="favorite-chefs-section mt-4">
          <h3>
            Chefs Favoritos
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {store.usuariosFavoritos && store.usuariosFavoritos.length > 0 ? (
              store.usuariosFavoritos.map((usuario) => (
                <Link
                  key={usuario.id}
                  to={`/user/${usuario.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="recipe-card col-md-3 p-2 m-2">
                    <img
                      src={usuario.profile_image}
                      alt="Usuario sin imagen"
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
       {!isProfile && visitedUser && Array.isArray(visitedUser.favorite_users) && (
        <div className="favorite-chefs-section mt-4">
          <h3>Chefs Favoritos</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {visitedUser.favorite_users.length > 0 ? (
              listaUsuarios
                .filter(usuario => visitedUser.favorite_users.includes(usuario.id))
                .map((usuario, index) => {
                  return (
                    <Link
                      to={`/user/${usuario.id}`}
                      style={{ textDecoration: "none" }}
                      key={usuario.id || index}
                    >
                      <div className="recipe-card col-md-3 p-2 m-2" key={usuario.id || index}>
                        <img
                          src={usuario.profile_image}
                          alt="Usuario sin imagen"
                          className="img-fluid"
                        />
                        <p className="recipe-name">
                          {usuario.first_name && usuario.last_name
                            ? `${usuario.first_name} ${usuario.last_name}`
                            : usuario.user_name || "Usuario sin nombre"}
                        </p>
                      </div>
                    </Link>
                  );
                })
            ) : (
              <p>No hay chefs favoritos</p>
            )}
                </div>
              </div>
            )}
    </>
  );
};
