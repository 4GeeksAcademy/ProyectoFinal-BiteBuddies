import React from "react";

export const SearchDropdown = ({ searchCategory, search, store, handleUserClick }) => {
    if (searchCategory === "usuarios" && search) {
        return (
            <ul className="dropdown-menu show" style={{ position: "absolute" }}>
                {store.searchResultUsers.length > 0 ? (
                    store.searchResultUsers.map((user, index) => (
                        <li key={index} className="dropdown-item" onClick={() => handleUserClick(user.id)}>
                            {user.user_name}
                        </li>
                    ))
                ) : (
                    <li className="dropdown-item">Buscando usuarios...</li>
                )}
            </ul>
        );
    }
    if (search && store.searchResult.length > 0 && searchCategory !== "usuarios") {
        return (
            <ul className="dropdown-menu show" style={{ position: "absolute", width: "50%" }}>
                {store.searchResult.map((item, index) => (
                    <li key={index} className="dropdown-item">
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    }
    return null;
};
