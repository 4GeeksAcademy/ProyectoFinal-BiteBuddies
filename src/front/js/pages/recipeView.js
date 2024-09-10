import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const RecipeView = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();  // Para obtener el id de la receta desde la URL
    const [hasFetched, setHasFetched] = useState(false);

    // Traemos los detalles de la receta si no lo hemos hecho ya
    useEffect(() => {
        if (id && !hasFetched) {
            console.log("Fetching details for recipe_id:", id);
            actions.traerDetalleDeReceta(id); // Acción del flux que trae los detalles de la receta
            setHasFetched(true); // Marcamos como "ya traído"
        }
    }, [id, hasFetched, actions]);

    const recipe = store.detallesDeReceta || {}; // Si no hay receta, usamos un objeto vacío

    return (
        <div className="recipe-container">
            {/* Imagen de la receta */}
            <div className="recipe-photo">
                <img 
                    src={recipe.image_url || "https://via.placeholder.com/150"} // Ajustado a `image_url`
                    alt="Foto de la receta" 
                    className="img-fluid" 
                />
            </div>

            {/* Detalles de la receta */}
            <div className="recipe-details">
                <h1>{recipe.name || "Nombre de la Receta"}</h1>
                <p>{recipe.description || "Descripción no disponible"}</p>
                
                {/* Instrucciones */}
                <div className="recipe-instructions">
                    <h2>Preparación:</h2>
                    {recipe.steps ? (
                        recipe.steps.split('\n').map((step, index) => (
                            <p key={index}>{step}</p>
                        ))
                    ) : (
                        <p>Instrucciones no disponibles</p>
                    )}
                </div>
            </div>

            {/* Barra lateral con ingredientes y categorías */}
            <div className="recipe-sidebar">
                {/* Ingredientes */}
                <div className="ingredients">
                    <h2>Ingredientes</h2>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.quantity} de {ingredient.name}</li> // Mostramos cantidad y nombre
                            ))
                        ) : (
                            <li>Ingredientes no disponibles</li>
                        )}
                    </ul>
                </div>

                {/* Categorías */}
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

                {/* Botón de favoritos */}
                <button className="favorite-button btn btn-outline-primary">&lt;3 (guardar fav)</button>
            </div>

            {/* Sección de comentarios */}
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

                {/* Añadir comentario */}
                <div className="add-comment">
                    <input type="text" placeholder="Comentario..." className="form-control" />
                    <button className="btn btn-primary mt-2">Enviar</button>
                </div>
            </div>
        </div>
    );
};