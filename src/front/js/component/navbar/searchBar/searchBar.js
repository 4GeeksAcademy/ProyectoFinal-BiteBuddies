import React, { useState } from "react";
import { SearchOptions } from "./searchOptions";

export const SearchBar = ({ actions, store, handleRecetasClick, handleUsuariosClick }) => {
    const [search, setSearch] = useState("");
    const [searchCategory, setSearchCategory] = useState("recetas");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        actions.buscar(e.target.value, searchCategory);
    };

    return (
        <div className="search-bar-container">
            {/* Colocamos los botones y el input juntos */}
            <div className="input-group">
                <input
                    type="text"
                    className="form-control mx-2"
                    placeholder={`Buscar ${searchCategory}...`}
                    value={search}
                    onChange={handleSearchChange}
                />
                <SearchOptions
                    searchCategory={searchCategory}
                    setSearchCategory={setSearchCategory}
                    isUserView={store.isUserView}
                    switchToUsersView={handleUsuariosClick}
                    switchToRecipesView={handleRecetasClick}
                />
            </div>
        </div>
    );
};


