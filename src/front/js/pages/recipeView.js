import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/recipeView.css";

export const RecipeView = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();  // Cambiado a `id`
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (id && !hasFetched) {
            console.log("Fetching details for recipe_id:", id);
            actions.traerDetalleDeReceta(id);
            setHasFetched(true); // Marca que ya se ha hecho la solicitud
        }
    }, [id, hasFetched, actions]);

    const recipe = store.detallesDeReceta;

    return (
        <div className="recipe-container">
            <div className="recipe-photo">
                <img src={recipe.photo_url || "https://via.placeholder.com/150"} alt="Foto de la receta" className="img-fluid" />
            </div>
            <div className="recipe-details">
                <h1>{recipe.name || "Nombre de la Receta"}</h1>
                <div className="recipe-instructions">
                    <h2>Preparación:</h2>
                    {recipe.steps ? (recipe.steps.split('\n').map((step, index) => (
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
                        {recipe.ingredients ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name}</li>
                            ))
                        ) : (
                            <li>Ingredientes no disponibles</li>
                        )}
                    </ul>
                </div>
                <button className="favorite-button btn btn-outline-primary">&lt;3 (guardar fav)</button>
            </div>
            <div className="comments-section">
                <h2>Comentarios</h2>
                {recipe.comments ? (
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
                    <input type="text" placeholder="Comentario..." className="form-control" />
                    <button className="btn btn-primary mt-2">Enviar</button>
                </div>
            </div>
        </div>
    );
};