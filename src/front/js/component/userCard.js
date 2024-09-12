import React from "react";
import { Link } from "react-router-dom";

export const UserCard = ({ user }) => {
    return (
        <div className="user-card bg-light p-2">
            <img
                src={user.profile_image_url || "https://via.placeholder.com/150"} // Imagen del perfil del usuario
                alt={user.user_name}
                className="img-fluid"
            />
            <div className="user-info">
                <p className="user-name">{user.user_name}</p>
                <p className="user-full-name">{user.first_name} {user.last_name}</p>
                {/* Puedes agregar más información si es necesario */}
            </div>
            <Link to={`/user/${user.id}`} className="btn btn-primary">
                Ver perfil
            </Link>
        </div>
    );
};
