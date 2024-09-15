import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export const FavoriteRecipes = ({ isProfile, visitedUser }) => {
  return (
    <>
      {isProfile && (
        <div className="favorite-recipes-section mt-4">
          <h3>
            Recetas Favoritas
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {store.recetasFavoritas && store.recetasFavoritas.length > 0 ? (
              store.recetasFavoritas.map((receta, index) => (
                <Link
                  key={receta.id}
                  to={`/recipe/${receta.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="recipe-card col-md-3 p-2 m-2">
                    <img
                      src={receta.image_url}
                      alt="Receta"
                      className="img-fluid"
                    />
                    <p className="recipe-name">
                      {receta.name || "Receta sin nombre"}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No tienes recetas favoritas.</p>
            )}
          </div>
        </div>
      )}
      {!isProfile && visitedUser && Array.isArray(visitedUser.uploaded_recipes) && (
        <div className="recipes-section mt-4">
          <h3>
            Recetas Favoritas
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {visitedUser.favorite_recipes && visitedUser.favorite_recipes.length > 0 ? (
              visitedUser.favorite_recipes.map((receta) => (
                <Link
                  key={receta.id}
                  to={`/recipe/${receta.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="recipe-card col-md-3 p-2 m-2">
                    <img
                      src={receta.image_url}
                      alt="Receta"
                      className="img-fluid"
                    />
                    <p className="recipe-name">
                      {receta.name || "Receta sin nombre"}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>Este chef no tiene recetas favoritas</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
