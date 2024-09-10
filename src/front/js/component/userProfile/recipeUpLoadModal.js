import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";

export const RecipeUploadModal = ({ show, handleClose }) => {
  const { store, actions } = useContext(Context);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    steps: "",
    ingredients_ids: [],
    category_ids: [],
    image: "",  // Aquí guardaremos la URL de la imagen
  });
  
  useEffect(() => {
    actions.traerIngredientes();
    actions.traerCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
    console.log(recipeData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await actions.publicarReceta(
      recipeData.name,
      recipeData.description,
      recipeData.steps,
      recipeData.ingredients_ids,
      recipeData.category_ids,
      recipeData.image  // Usamos `image` para enviar la URL de la imagen
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
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={recipeData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ingredientes</label>
                {store.listaDeIngredientes.map((ingredient) => (
                  <div key={ingredient.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={ingredient.id}
                      onChange={(e) => {
                        const value = parseInt(e.target.value); // Asegúrate de que sea un número
                        const selectedIngredients = recipeData.ingredients_ids.includes(value)
                          ? recipeData.ingredients_ids.filter((id) => id !== value)
                          : [...recipeData.ingredients_ids, value];

                        setRecipeData({
                          ...recipeData,
                          ingredients_ids: selectedIngredients,
                        });
                      }}
                      checked={recipeData.ingredients_ids.includes(ingredient.id)} // Mantener el estado actualizado
                    />
                    <label className="form-check-label">{ingredient.name}</label>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Categorias</label>
                {store.listaDeCategorias.map((category) => (
                  <div key={category.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={category.id}
                      onChange={(e) => {
                        const value = parseInt(e.target.value); // Asegúrate de que sea un número
                        const selectedCategories = recipeData.category_ids.includes(value)
                          ? recipeData.category_ids.filter((id) => id !== value)
                          : [...recipeData.category_ids, value];

                        setRecipeData({
                          ...recipeData,
                          category_ids: selectedCategories,
                        });
                      }}
                      checked={recipeData.category_ids.includes(category.id)} // Mantener el estado actualizado
                    />
                    <label className="form-check-label">{category.name}</label>
                  </div>
                ))}
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
                  type="text"  // Cambia a tipo `text` para aceptar la URL de la imagen
                  className="form-control"
                  name="image"  // Nombre del campo debe coincidir con el estado
                  value={recipeData.image}  // Aquí se almacena la URL de la imagen
                  onChange={handleChange}  // Maneja cambios
                  placeholder="Ingresa la URL de la imagen"  // Añadir un placeholder opcional
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