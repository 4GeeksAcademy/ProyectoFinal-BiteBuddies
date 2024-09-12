import React, { useState } from "react";
import { SearchOptions } from "./searchOptions";
import { SearchDropdown } from "./searchDropdown";

export const SearchBar = ({ actions, store }) => {
    const [search, setSearch] = useState("");
    const [searchCategory, setSearchCategory] = useState("recetas");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        actions.buscar(e.target.value, searchCategory);
    };

    return (
        <div className="search-container">
            <SearchOptions 
                searchCategory={searchCategory} 
                setSearchCategory={setSearchCategory} 
                isUserView={store.isUserView} // Estado de vista
                switchToUsersView={actions.switchToUsersView} // Acción para cambiar a vista de usuarios
                switchToRecipesView={actions.switchToRecipesView} // Acción para cambiar a vista de recetas
            />
            <input
                type="text"
                className="search-input"
                placeholder={`Buscar ${searchCategory}...`}
                value={search}
                onChange={handleSearchChange}
            />
            {/* <SearchDropdown searchCategory={searchCategory} search={search} store={store} /> */}
        </div>
    );
};

