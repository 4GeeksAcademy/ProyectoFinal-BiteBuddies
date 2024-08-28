import React from "react";
import "../../styles/recipeView.css"; 

export const RecipeView = () => {
    return (
        <div className="recipe-container">
            <div className="recipe-photo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLYuqb1GgfaGlWJYB0Dus_hUwVRiRO7kTQ1Q&s" alt="Foto de la receta" className="img-fluid" />
            </div>
            <div className="recipe-details">
                <h1>Nombre de la Receta</h1>
                <div className="recipe-instructions">
                    <h2>Preparación:</h2>
                    <p>Instrucción 1...</p>
                    <p>Instrucción 2...</p>
                </div>
            </div>
            <div className="recipe-sidebar">
                <div className="ingredients">
                    <h2>Ingredientes</h2>
                    <ul>
                        <li>Ingrediente 1</li>
                        <li>Ingrediente 2</li>
                    </ul>
                </div>
                <button className="favorite-button btn btn-outline-primary">&lt;3 (guardar fav)</button>
            </div>
            <div className="comments-section">
                <h2>Comentarios</h2>
                <div className="comment">
                    <span className="username">Usuario</span>
                    <p>Comentario...</p>
                </div>
                <div className="add-comment">
                    <input type="text" placeholder="Comentario..." className="form-control" />
                    <button className="btn btn-primary mt-2">Enviar</button>
                </div>
            </div>
        </div>
    );
};