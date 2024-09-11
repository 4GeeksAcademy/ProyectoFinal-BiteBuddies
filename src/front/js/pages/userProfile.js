import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { userId } = useParams();

  const withSession = !!store?.isLoggedIn;


  const isOwnProfile = !userId || userId === String(store.currentUser?.id);

  useEffect(() => {
    if (!withSession) {
      navigate("/login");
    } else if (!isOwnProfile) {
      actions.getOtherUserProfile(userId);
      actions.getOtherUserRecipes(userId);
    } else {
   
      actions.getUserRecipes();
    }
  }, [withSession, userId]);

  const handleEditProfile = () => {
    console.log("Editar perfil");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Si los datos no están disponibles, mostrar un mensaje de carga
  if (!store.currentUser || (userId && !store.otherUserProfile)) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container profile-container" style={{ position: "relative" }}>
      {/* Mostrar los datos del usuario actual o del otro usuario según corresponda */}
      <ProfileHeader user={isOwnProfile ? store.currentUser : store.otherUserProfile} />

      <Tabs handleEditProfile={isOwnProfile ? handleEditProfile : null} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="tab-content">
        {activeTab === "misRecetas" && (
          <>
            {(isOwnProfile ? store.listaDeRecetasPublicadas : store.listaDeRecetasDeOtroUsuario).length === 0 ? (
              <div className="text-center">
                <p>{isOwnProfile ? "No tienes recetas propias." : "Este usuario no tiene recetas propias."}</p>
              </div>
            ) : (
              <RecipeList
                recipes={isOwnProfile ? store.listaDeRecetasPublicadas : store.listaDeRecetasDeOtroUsuario}
                handleOpenModal={isOwnProfile ? handleOpenModal : null}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
              />
            )}
            {isOwnProfile && (
              <div className="row mt-3 justify-content-center">
                <button className="btn btn-primary" style={{ borderRadius: "5px" }} onClick={handleOpenModal}>
                  Subir Receta
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "favoritas" && <FavoriteRecipes store={store} actions={actions} />}
      </div>

      {showModal && <RecipeUploadModal show={showModal} handleClose={handleCloseModal} />}
    </div>
  );
};
