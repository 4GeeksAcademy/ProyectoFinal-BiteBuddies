import React, { useContext } from "react";
import { Context } from "../../../store/appContext";
import { Link } from "react-router-dom";
import "../styles.css";

export const RecipeList = ({ isProfile, visitedUser }) => {
  const { store } = useContext(Context);

  return (
    <>
      {isProfile && (
        <div className="recipes-section mt-4">
          <h3>
            Mis recetas
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {store.listaDeRecetasPublicadas.length === 0 ? (
              <div className="text-center">
                <p>No tienes recetas propias.</p>
              </div>
            ) : (
              store.listaDeRecetasPublicadas.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <div
                    className="recipe-card p-2 m-2"
                  >
                    <img
                      src={recipe.image_url}
                      alt="Receta"
                      className="img-fluid"
                    />
                    <p className="recipe-name">
                      {recipe.name || "Receta sin nombre"}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
      {!isProfile && visitedUser && Array.isArray(visitedUser.uploaded_recipes) &&(
        <div className="recipes-section mt-4">
          <h3>
            Mis recetas
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {visitedUser.uploaded_recipes.length === 0 ? (
              <div className="text-center">
                <p>Este chef no ha publicado recetas</p>
              </div>
            ) : (
              visitedUser.uploaded_recipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <div
                    className="recipe-card col-md-3 p-2 m-2">
                    <img
                      src={recipe.image_url}
                      alt="Receta"
                      className="img-fluid"
                    />
                    <p className="recipe-name">
                      {recipe.name || "Receta sin nombre"}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};