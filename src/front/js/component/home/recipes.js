import React from "react";
import { Link } from "react-router-dom";

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
            <h4>Recetas</h4>
            <div className="recipe-list d-flex flex-wrap justify-content-center">
                {filteredRecetas.length > 0 ? (
                    filteredRecetas.map((receta) => (
                        <Link key={receta.id} to={`/recipe/${receta.id}`}>
                            <div className="recipe-card bg-light p-2">
                                <img
                                    src={receta.image_url}
                                    alt={receta.name}
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
