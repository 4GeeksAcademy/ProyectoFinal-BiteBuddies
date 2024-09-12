import React from "react";
import "./homeStyles.css";

export const Categories = ({ categorias, selectedCategory, onSelectCategory }) => {
    if (categorias.length === 0) {
        return (
            <div className="loading-spinner">
                Cargando categorias ... <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
        ); 
    }

    return (
       <div>
            
            <div className="conjunto-botones d-flex justify-content-center">
                {/* Botón para mostrar todas las recetas */}
                <button
                    className={`btn-custom-h m-3 ${selectedCategory === null ? 'active' : ''}`}
                    onClick={() => onSelectCategory(null)} // Muestra todas las recetas si se selecciona null
                >
                    Todas las recetas
                </button>

                {/* Botones de categorías individuales */}
                {categorias.map((category) => (
                    <button
                        className={`btn-custom-h m-3 ${selectedCategory === category.id ? 'active' : ''}`}
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)} // Llama a la función para seleccionar una categoría
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
