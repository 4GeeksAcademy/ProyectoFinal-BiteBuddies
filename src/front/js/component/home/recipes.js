import React from "react";
import { Link } from "react-router-dom";
import "./homeStyles.css";

export const Recipes = ({ recetas = [], selectedCategory, searchResults = [], isLoading}) => {
    const filteredRecetas = searchResults.length > 0 
        ? searchResults 
        : selectedCategory 
        ? recetas.filter((receta) =>
            receta.categories.some(category => category.id === selectedCategory)
        )
        : recetas;
        if (recetas.length === 0) {
        return (
            <div className="loading-spinner">
                Cargando recetas ... <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
        ); 
    }

    return (
        <div>
            <div className="recipe-list-h">
                {filteredRecetas.length > 0 ? (
                    filteredRecetas.map((receta) => (
                        <Link key={receta.id} to={`/recipe/${receta.id}`}>
                            <div className="recipe-card-h p-2">
                                <img
                                    src={receta.image_url}
                                    alt={receta.name}
                                    className="img-fluid"
                                />
                                <p className="recipe-name-h">{receta.name}</p>
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
