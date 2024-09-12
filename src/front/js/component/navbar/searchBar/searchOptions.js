import React from "react";

export const SearchOptions = ({ searchCategory, setSearchCategory }) => {
    return (
        <div className="search-options">
            <button
                type="button"
                className={`option-button ${searchCategory === 'recetas' ? 'active' : ''}`}
                onClick={() => setSearchCategory("recetas")}
            >
                Recetas
            </button>
            <button
                type="button"
                className={`option-button ${searchCategory === 'usuarios' ? 'active' : ''}`}
                onClick={() => setSearchCategory("usuarios")}
            >
                Usuarios
            </button>
        </div>
    );
};
