import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const RecipeUploadModal = ({ show, handleClose }) => {
  const { actions } = useContext(Context);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    steps: "",
    ingredients_ids: [],
    category_ids: []
  });

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await actions.publicarReceta(
      recipeData.name,
      recipeData.description,
      recipeData.steps,
      recipeData.ingredients_ids,
      recipeData.category_ids
    );
    if (success) {
      handleClose();
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Subir Receta</h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre de la receta</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={recipeData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={recipeData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pasos</label>
                <textarea
                  className="form-control"
                  name="steps"
                  value={recipeData.steps}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Aquí puedes agregar selects o inputs para ingredientes y categorías */}
              <button type="submit" className="btn btn-primary">
                Subir Receta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
