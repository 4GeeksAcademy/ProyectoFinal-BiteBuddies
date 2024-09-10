import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/recipeView.css";

export const RecipeView = () => {
    const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadRecipeDetailsAndFavorites = async () => {
      // Cargar los detalles de la receta
      if (!hasFetched && id) {
        await actions.traerDetalleDeReceta(id);
        setHasFetched(true);  // Marcar como ya cargado
      }
      
      // Cargar los favoritos del usuario
      await actions.getUserFavorites();
      
      // Verificar si la receta actual está en favoritos
      if (id) {
        const isFav = actions.isRecipeFavorite(parseInt(id));
        setIsFavorite(isFav);
      }
    };

    loadRecipeDetailsAndFavorites();
  }, [id, actions, hasFetched]);

  const recipe = store.detallesDeReceta || {};  // Asegurarse de que detallesDeReceta existe

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      const success = await actions.removeRecipeFromFavorites(recipe.id);
      if (success) {
        setIsFavorite(false);
      }
    } else {
      const success = await actions.addRecipeToFavorites(recipe.id);
      if (success) {
        setIsFavorite(true);
      }
    }
  };
  return (
    <div className="recipe-container">
      <div className="recipe-photo">
        <img
          src={recipe.image_url || "https://via.placeholder.com/150"}
          alt="Foto de la receta"
          className="img-fluid"
        />
      </div>
      <div className="recipe-details">
        <h1>{recipe.name || "Nombre de la Receta"}</h1>
        <p>{recipe.description || "Descripción no disponible"}</p>

        <div className="recipe-instructions">
          <h2>Preparación:</h2>
          {recipe.steps ? (
            recipe.steps.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))
          ) : (
            <p>Instrucciones no disponibles</p>
          )}
        </div>
      </div>
      <div className="recipe-sidebar">
        <div className="ingredients">
          <h2>Ingredientes</h2>
          <ul>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))
            ) : (
              <li>Ingredientes no disponibles</li>
            )}
          </ul>
        </div>
        <div className="categories">
          <h2>Categorías</h2>
          <ul>
            {recipe.categories && recipe.categories.length > 0 ? (
              recipe.categories.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))
            ) : (
              <li>Categorías no disponibles</li>
            )}
          </ul>
        </div>
        {/* Botón para añadir o eliminar de favoritos */}
        <button
          className="favorite-button btn btn-outline-primary"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "❤️ Favorito" : "♡ Añadir a favoritos"}
        </button>
      </div>
      <div className="comments-section">
        <h2>Comentarios</h2>
        {recipe.comments && recipe.comments.length > 0 ? (
          recipe.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <span className="username">{comment.username}</span>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
        <div className="add-comment">
          <input
            type="text"
            placeholder="Comentario..."
            className="form-control"
          />
          <button className="btn btn-primary mt-2">Enviar</button>
        </div>
      </div>
    </div>
  );
};