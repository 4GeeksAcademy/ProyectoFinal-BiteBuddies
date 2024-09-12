import React, { useState } from "react";
import { SearchOptions } from "./searchOptions";
import { SearchDropdown } from "./searchDropdown";

export const SearchBar = ({ actions, store }) => {
    const [search, setSearch] = useState("");
    const [searchCategory, setSearchCategory] = useState("ingredientes");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        actions.buscar(e.target.value, searchCategory);
    };

    return (
        <div className="search-container">
            <SearchOptions searchCategory={searchCategory} setSearchCategory={setSearchCategory} />
            <input
                type="text"
                className="search-input"
                placeholder={`Buscar ${searchCategory}...`}
                value={search}
                onChange={handleSearchChange}
            />
            <SearchDropdown searchCategory={searchCategory} search={search} store={store} />
        </div>
    );
};
