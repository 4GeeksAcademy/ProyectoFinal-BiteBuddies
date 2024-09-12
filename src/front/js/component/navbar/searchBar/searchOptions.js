import React from "react";

export const SearchOptions = ({ searchCategory, setSearchCategory, isUserView, switchToUsersView, switchToRecipesView }) => {
    return (
        <div className="search-options">
            {/* Botón para cambiar a la vista de recetas */}
            <button
                type="button"
                className={`option-button ${!isUserView ? 'active' : ''}`}
                onClick={() => {
                    setSearchCategory("recetas");
                    switchToRecipesView(); // Cambiar a la vista de recetas
                }}
            >
                Recetas
            </button>

            {/* Botón para cambiar a la vista de usuarios */}
            <button
                type="button"
                className={`option-button ${isUserView ? 'active' : ''}`}
                onClick={() => {
                    setSearchCategory("usuarios");
                    switchToUsersView(); // Cambiar a la vista de usuarios
                }}
            >
                Usuarios
            </button>
        </div>
    );
};
