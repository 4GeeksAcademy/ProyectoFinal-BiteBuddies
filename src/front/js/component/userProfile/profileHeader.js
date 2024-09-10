import React from "react";

export const ProfileHeader = ({ user }) => {
  return (
    <div className="navbar-profile d-flex justify-content-between align-items-center p-3 bg-light">
      <div className="profile-photo text-center col-3 p-1">
        <img
          src="https://via.placeholder.com/150"
          alt="Foto de perfil"
          className="img-fluid rounded-circle"
        />
        <p>{user.user_name || "error"}</p>
      </div>
      <div className="profile-info col-5 p-1">
        <p>{user.first_name || "error"}</p>
        <p>{user.email || "error"}</p>
        <p>5 Recetas subidas</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>
      </div>
    </div>
  );
};