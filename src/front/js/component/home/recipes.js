import React from "react";
import { Link } from "react-router-dom";

export const Recipes = ({ recetas, selectedCategory }) => {
    const filteredRecetas = selectedCategory 
        ? recetas.filter(receta => 
            receta.categories.some(category => category.id === selectedCategory)
        ) 
        : recetas;  // Muestra todas las recetas si no hay categoría seleccionada

    return (
        <div>
            <h4>Recetas</h4>
            <div className="recipe-list">
                {filteredRecetas.length > 0 ? (
                    filteredRecetas.map((receta) => (
                        <Link key={receta.id} to={`/recipe/${receta.id}`}>
                            <div className="recipe-card bg-light p-2">
                                <img
                                    src={receta.image_url}
                                    alt="Receta"
                                    className="img-fluid"
                                />
                                <p className="recipe-name">{receta.name}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay recetas disponibles para esta categoría.</p>
                )}
            </div>
        </div>
    );
};