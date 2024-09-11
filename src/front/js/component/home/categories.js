import React from "react";

export const Categories = ({ categorias, selectedCategory, onSelectCategory }) => {
    if (categorias.length === 0) {
        return <p>Cargando categorías...</p>; // Muestra un mensaje de carga si no hay categorías
    }

    return (
        <div>
            <h4>Categorías</h4>
            <div className="d-flex justify-content-center">
                <button
                    className={`btn-custom m-3 ${selectedCategory === null ? 'active' : ''}`}
                    onClick={() => onSelectCategory(null)}
                >
                    Todas las recetas
                </button>
                {categorias.map((category) => (
                    <button
                        className={`btn-custom m-3 ${selectedCategory === category.id ? 'active' : ''}`}
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};