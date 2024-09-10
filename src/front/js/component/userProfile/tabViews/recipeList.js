import React from "react";
import { RecipeUploadModal } from "../recipeUpLoadModal";

export const RecipeList = ({ recipes, handleOpenModal, showModal, handleCloseModal }) => {
  return (
    <div className="recipes-section mt-4">
      <h3 style={{ borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        Mis recetas
      </h3>
      <div className="row justify-content-center">
        {recipes.map((receta, index) => (
          <div
            className="recipe-card col-md-3 bg-light p-2 m-2"
            style={{ width: "23%" }}
            key={receta.id || index}
          >
            <img
              src="https://via.placeholder.com/100"
              alt="Receta"
              className="img-fluid"
            />
            <p className="recipe-name">{receta.name || "Receta sin nombre"}</p>
          </div>
        ))}
      </div>

      <div className="row mt-3 justify-content-center">
        <button className="btn-custom w-25" style={{ borderRadius: "5px" }} onClick={handleOpenModal}>
          Subir Receta
        </button>

        <RecipeUploadModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};