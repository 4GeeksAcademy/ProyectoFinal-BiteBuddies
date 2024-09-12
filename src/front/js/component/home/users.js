import React from "react";
import { UserCard } from "../userCard";

export const Users = ({ usuarios, searchResults }) => {
    const displayedUsers = searchResults.length > 0 ? searchResults : usuarios;

    return (
        <div className="user-list d-flex flex-wrap justify-content-center">
            {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))
            ) : (
                <p>No hay usuarios disponibles.</p>
            )}
        </div>
    );
};