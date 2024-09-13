import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

export const RecipeCard = ({ recipe }) => {
  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);  
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);


 useEffect(() => {
    const loadRecipeDetailsAndFavorites = async () => {
        const recipeDetails = await actions.traerDetalleDeReceta(id);
        
        if (recipeDetails && recipeDetails.comments) {
            setComments(recipeDetails.comments);
        } else {
            setComments([]);
        }
    };

    loadRecipeDetailsAndFavorites();
  }, [id, store.isLoggedIn]);

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

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") return;

    const newComment = await actions.addCommentToRecipe(id, commentText);
    if (newComment) {
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  // Asegúrate de que `recipe` esté definido antes de acceder a sus propiedades
  if (!recipe) return <div>Cargando receta...</div>;

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

        <div className="recipe-instructions d-flex flex-column">
          <div>
            <h2>Descripción:</h2>
            <p>{recipe.description || "Descripción no disponible"}</p>
            <h2>Preparación:</h2>
            {recipe.steps ? (
              recipe.steps.split("\n").map((step, index) => (
                <p key={index}>{step}</p>
              ))
            ) : (
              <p>Instrucciones no disponibles</p>
            )}
          </div>
          <div className="published-by">
            <p>
              {recipe.uploaded_by_user ? (
                <>
                  Publicada por{" "}
                  <Link to={`/user/${recipe.uploaded_by_user.id}`}>
                    {recipe.uploaded_by_user.user_name}
                  </Link>
                </>
              ) : (
                "Publicada por BiteBuddies"
              )}
            </p>
          </div>
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
        {store.isLoggedIn && (
          <button
            className="favorite-button btn btn-outline-primary"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? "❤️ Favorito" : "♡ Añadir a favoritos"}
          </button>
        )}
        </div>
      <div className="comments-section">
        <h2>Comentarios</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className="comment" key={index}>
              <span className="username">{comment.user_name}</span>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
        {store.isLoggedIn && (
        <div className="add-comment">
          <input
            type="text"
            placeholder="Comentario..."
            className="form-control"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleCommentSubmit}>
            Enviar
          </button>
        </div>
        )}
      </div>
    </div>
  );
};
