import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/stylesUserProfile.css";
import { Context } from "../store/appContext";
import { ProfileHeader } from "../component/userProfile/profileHeader";
import { Tabs } from "../component/userProfile/tabs";
import { RecipeList } from "../component/userProfile/tabViews/recipeList";
import { RecipeUploadModal } from "../component/userProfile/recipeUpLoadModal";
import { FavoriteRecipes } from "../component/userProfile/tabViews/favoriteRecipes";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("misRecetas");
  const withSession = !!store?.isLoggedIn;
  const navigate = useNavigate();

  // Este efecto se encargará de verificar la sesión y cargar las recetas del usuario
  useEffect(() => {
    if (!withSession) {
      navigate("/login");
    } else {
      // Llamamos a la acción que trae las recetas del usuario
      actions.getUserRecipes();
    }
    console.log("recetas publicadas", store.listaDeRecetasPublicadas);
  }, [withSession]);

  const handleEditProfile = () => {
    console.log("Editar perfil");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing the modal");
    setShowModal(false);
  };

  if (!store.currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container profile-container" style={{ position: "relative" }}>
      <ProfileHeader user={store.currentUser} />

      <Tabs handleEditProfile={handleEditProfile} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="tab-content">
        {activeTab === "misRecetas" && (
          <>
            {store.listaDeRecetasPublicadas.length === 0 ? (
              <div className="text-center">
                <p>No tienes recetas propias.</p>
              </div>
            ) : (
              <RecipeList
                recipes={store.listaDeRecetasPublicadas}
                handleOpenModal={handleOpenModal}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
              />
            )}
            <div className="row mt-3 justify-content-center">
              <button
                className="btn btn-primary"
                style={{ borderRadius: "5px" }}
                onClick={handleOpenModal}
              >
                Subir Receta
              </button>
            </div>
          </>
        )}

        {activeTab === "favoritas" && <FavoriteRecipes store={store} actions={actions} />}
      </div>
      {showModal && <RecipeUploadModal show={showModal} handleClose={handleCloseModal} />}
    </div>
  );
};