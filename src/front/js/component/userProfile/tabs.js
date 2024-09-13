import React from "react";
import "./styles.css";

export const Tabs = ({ handleEditProfile, setActiveTab, activeTab, isProfile }) => {
  
  return (
    <div className="btn-custom-all d-flex justify-content-around">
      {isProfile &&(
        <button className="btn-custom" onClick={handleEditProfile} style={{ width: "20%" }}>
        Editar Perfil
      </button>
      )}
      <button
        className={`btn-custom ${activeTab === "misRecetas" ? "active" : ""}`}
        onClick={() => setActiveTab("misRecetas")}
        style={{ width: "20%" }}
      >
        {isProfile ? "Mis Recetas": "Recetas Publicadas"}
      </button>
      <button
        className={`btn-custom ${activeTab === "recetasFavoritas"? "active" : ""}`}
        onClick={() => setActiveTab("recetasFavoritas")}
        style={{ width: "20%" }}
      >
        Recetas Favoritas
      </button>
      <button
        className={`btn-custom ${activeTab === "chefsFavoritos" ? "active" : ""}`}
        onClick={() => setActiveTab("chefsFavoritos")}
        style={{ width: "20%" }}
      >
        Chefs Favoritos
      </button>
    </div>
  );
};
