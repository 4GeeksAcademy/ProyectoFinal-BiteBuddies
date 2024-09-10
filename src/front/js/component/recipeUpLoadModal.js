import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";


export const RecipeUploadModal = ({ show, handleClose }) => {
  const { store, actions } = useContext(Context);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    steps: "",
    ingredients_ids: [],
    category_ids: [],
    image: null,
  });
  
  useEffect(() => {
    actions.traerIngredientes();
    actions.traerCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRecipeData({ ...recipeData, image: files[0] });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await actions.publicarReceta(
      recipeData.name,
      recipeData.description,
      recipeData.steps,
      recipeData.ingredients_ids,
      recipeData.category_ids,
      recipeData.image
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
                <label>Ingredientes</label>
                <select
                  className="form-control"
                  name="ingredients_ids"
                  multiple
                  value={recipeData.ingredients_ids}
                  onChange={(e) =>
                    setRecipeData({
                      ...recipeData,
                      ingredients_ids: Array.from(e.target.selectedOptions, (option) => option.value),
                    })
                  }
                  required
                >
                  {store.listaDeIngredientes.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select
                  className="form-control"
                  name="category_ids"
                  multiple
                  value={recipeData.category_ids}
                  onChange={(e) =>
                    setRecipeData({
                      ...recipeData,
                      category_ids: Array.from(e.target.selectedOptions, (option) => option.value),
                    })
                  }
                  required
                >
                  {store.listaDeCategorias.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
               <div className="form-group">
                <label>Imagen</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleChange}
                />
                </div>
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
