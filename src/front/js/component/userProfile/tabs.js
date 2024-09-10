import React from "react";

export const Tabs = ({ handleEditProfile, setActiveTab, activeTab }) => {
  return (
    <div className="d-flex justify-content-around">
      <button className="btn-custom" onClick={handleEditProfile} style={{ width: "20%" }}>
        Editar Perfil
      </button>
      <button
        className={`btn-custom ${activeTab === "misRecetas" ? "active" : ""}`}
        onClick={() => setActiveTab("misRecetas")}
        style={{ width: "20%" }}
      >
        Mis Recetas
      </button>
      <button
        className={`btn-custom ${activeTab === "favoritas" ? "active" : ""}`}
        onClick={() => setActiveTab("favoritas")}
        style={{ width: "20%" }}
      >
        Recetas Favoritas
      </button>
      <button
        className={`btn-custom ${activeTab === "chefs" ? "active" : ""}`}
        onClick={() => setActiveTab("chefs")}
        style={{ width: "20%" }}
      >
        Chefs Favoritos
      </button>
      <button
        className={`btn-custom ${activeTab === "chats" ? "active" : ""}`}
        onClick={() => setActiveTab("chats")}
        style={{ width: "20%" }}
      >
        Chats
      </button>
    </div>
  );
};
