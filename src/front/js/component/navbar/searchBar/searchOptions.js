import React from "react";

export const SearchOptions = ({ searchCategory, setSearchCategory, isUserView, switchToUsersView, switchToRecipesView }) => {
    return (
        <div className="btn-group">
            <button
                type="button"
                className={`btn ${!isUserView ? 'btn-active' : 'btn-inactive'} mx-2`}
                onClick={() => {
                    setSearchCategory("recetas");
                    switchToRecipesView();
                }}
            >
                Recetas
            </button>

            <button
                type="button"
                className={`btn ${isUserView ? 'btn-active' : 'btn-inactive'} mx-2`}
                onClick={() => {
                    setSearchCategory("usuarios");
                    switchToUsersView();
                }}
            >
                Usuarios
            </button>
        </div>
    );
};

