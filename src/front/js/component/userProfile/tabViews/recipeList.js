import React from "react";
import { RecipeUploadModal } from "../recipeUpLoadModal";
import { Link } from "react-router-dom";

export const RecipeList = ({ recipes, showModal, handleCloseModal }) => {
  
  // Verificar si recipes es un array y tiene elementos
  if (!Array.isArray(recipes) || recipes.length === 0) {
    return <p>No hay recetas disponibles.</p>;
  }

  return (
    <div className="recipes-section mt-4">
      <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        Mis recetas
      </h3>
      <div className="d-flex flex-wrap justify-content-center">
        {recipes.map((receta) => (
          <Link key={receta.id} to={`/recipe/${receta.id}`}>
              <div
              className="recipe-card col-md-3 bg-light p-2 m-2"
            >
              <img
                src={receta.image_url}
                alt="Receta"
                className="img-fluid"
              />
              <p className="recipe-name">{receta.name || "Receta sin nombre"}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="row mt-3 justify-content-center">
        <RecipeUploadModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};