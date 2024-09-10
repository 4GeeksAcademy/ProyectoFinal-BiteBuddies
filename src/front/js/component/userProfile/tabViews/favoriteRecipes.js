import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const FavoriteRecipes = ({ store, actions }) => {
  useEffect(() => {
    if (!store.recetasFavoritas || store.recetasFavoritas.length === 0) {
      actions.getUserFavorites();
    }
  }, [store.recetasFavoritas, actions]);

  return (
    <div className="favorite-recipes-section mt-4">
      <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        Recetas Favoritas
      </h3>
      <div className="row justify-content-center">
        {store.recetasFavoritas && store.recetasFavoritas.length > 0 ? (
          store.recetasFavoritas.map((receta, index) => (
            <Link key={receta.id} to={`/recipe/${receta.id}`} style={{ textDecoration: "none" }}>
            <div
              className="recipe-card col-md-3 bg-light p-2 m-2"
              style={{ width: "23%" }}
            >
              <img
                src={receta.image_url}
                alt="Receta"
                className="img-fluid"
              />
              <p className="recipe-name">{receta.name || "Receta sin nombre"}</p>
            </div>
          </Link>
          ))
        ) : (
          <p>No tienes recetas favoritas.</p>
        )}
      </div>
    </div>
  );
};