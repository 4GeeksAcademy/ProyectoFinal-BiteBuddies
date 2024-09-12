import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Select from "react-select"
import "../userProfile/styles.css";

export const RecipeUploadModal = ({ show, handleClose }) => {
  const { store, actions } = useContext(Context);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    steps: "",
    ingredients_ids: [],
    category_ids: [],
    image: "",  
  });
  
const [ingredientsLoaded, setIngredientsLoaded] = useState(false);
const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  useEffect(() => {
    if (show) {
      if (!ingredientsLoaded) {
        actions.traerIngredientes().then(() => setIngredientsLoaded(true));
      }
      if (!categoriesLoaded) {
        actions.traerCategories().then(() => setCategoriesLoaded(true));
      }
    }
  }, [show, ingredientsLoaded, categoriesLoaded, actions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleIngredientsChange = (selectedOptions) => {
    const ingredientsIds = selectedOptions.map((option) => option.value);
    setRecipeData({ ...recipeData, ingredients_ids: ingredientsIds });
  };

  const handleCategoriesChange = (selectedOptions) => {
    const categoryIds = selectedOptions.map((option) => option.value);
    setRecipeData({ ...recipeData, category_ids: categoryIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting recipe", recipeData);

    const success = await actions.publicarReceta(
      recipeData.name,
      recipeData.description,
      recipeData.steps,
      recipeData.ingredients_ids,
      recipeData.category_ids,
      recipeData.image
    );
    console.log("Submission success:", success);
    if (success) {
    console.log("Closing modal");
    await actions.getUserRecipes();
    handleClose()
    } else {
      console.log("Recipe submission failed");
    }
  };

  const ingredientsOptions = store.listaDeIngredientes.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  const categoriesOptions = store.listaDeCategorias.map((category) => ({
    value: category.id,
    label: category.name,
  }));

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
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={recipeData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Ingredientes - Usando React-Select */}
              <div className="form-group">
                <label>Ingredientes</label>
                <Select
                  isMulti
                  options={ingredientsOptions}
                  onChange={handleIngredientsChange}
                  value={ingredientsOptions.filter((option) =>
                    recipeData.ingredients_ids.includes(option.value)
                  )}
                  placeholder="Selecciona ingredientes"
                />
              </div>

              <div className="form-group">
                <label>Categorías</label>
                <Select
                  isMulti
                  options={categoriesOptions}
                  onChange={handleCategoriesChange}
                  value={categoriesOptions.filter((option) =>
                    recipeData.category_ids.includes(option.value)
                  )}
                  placeholder="Selecciona categorías"
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
              <div className="form-group">
                <label>URL de la Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="image" 
                  value={recipeData.image}
                  onChange={handleChange}
                  placeholder="Ingresa la URL de la imagen"
                  required
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