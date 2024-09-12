import React from "react";
import { UserCard } from "./userCard";

export const Users = ({ usuarios, searchResults, currentUser }) => {
    const displayedUsers = searchResults.length > 0 ? searchResults : usuarios;
    if (!currentUser || !displayedUsers) {
        return (
            <div className="loading-spinner">
                Cargando chefs ... <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
        )}

    return (
        <div className="user-list d-flex flex-wrap justify-content-center">
            {displayedUsers.length > 0 ? (
                displayedUsers
                    .filter(user => user.id !== currentUser.id)
                    .map(user => (
                        <UserCard key={user.id} user={user} />
                    ))
            ) : (
                <p>No hay usuarios disponibles.</p>
            )}
        </div>
    );
};