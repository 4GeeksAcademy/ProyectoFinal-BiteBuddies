import React, { useState } from "react";

export const SearchOptions = ({ searchCategory, setSearchCategory, isUserView, switchToUsersView, switchToRecipesView }) => {
    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        actions.buscar(e.target.value, searchCategory);  // Asegúrate de que `actions.buscar` esté definido en el contexto.
    };

    return (
        <div className="conjunto-de-botones">
            <button
                type="button"
                className={`option-button btn ${!isUserView ? 'btn-active' : 'btn-inactive'} `}
                onClick={() => {
                    setSearchCategory("recetas");  // Actualiza la categoría a "recetas"
                    switchToRecipesView();  // Cambia la vista a recetas
                }}
            >
                Recetas
            </button>

            <button
                type="button"
                className={`option-button btn ${isUserView ? 'btn-active' : 'btn-inactive'} `}
                onClick={() => {
                    setSearchCategory("usuarios");  // Actualiza la categoría a "usuarios"
                    switchToUsersView();  // Cambia la vista a usuarios
                }}
            >
                Usuarios
            </button>
        </div>
    );
};