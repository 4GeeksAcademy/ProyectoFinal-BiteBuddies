import React, { useEffect } from "react";

export const FavoriteRecipes = ({ store, actions }) => {
  useEffect(() => {
    if (!store.favoriteRecipes || store.favoriteRecipes.length === 0) {
      actions.getUserFavorites();
    }
  }, [store.favoriteRecipes, actions]);

  return (
    <div className="favorite-recipes-section mt-4">
      <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        Recetas Favoritas
      </h3>
      <div className="row justify-content-center">
        {store.favoriteRecipes.length > 0 ? (
          store.favoriteRecipes.map((receta, index) => (
            <div
              className="recipe-card col-md-3 bg-light p-2 m-2"
              style={{ width: "23%" }}
              key={receta.id || index}
            >
              <img
                src={receta.image_url}
                alt="Receta Favorita"
                className="img-fluid"
              />
              <p className="recipe-name">{receta.name || "Receta sin nombre"}</p>
            </div>
          ))
        ) : (
          <p>No tienes recetas favoritas.</p>
        )}
      </div>
    </div>
  );
};