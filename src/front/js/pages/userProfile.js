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
  const withSession = !!store?.isLoggedIn;
  const navigate = useNavigate();
  const { userId } = useParams();

 useEffect(() => {
    if (!withSession) {
      navigate("/login");
    } else if (userId && userId !== store.currentUser.id) {
      actions.getOtherUserRecipes(userId);
      actions.getOtherUserProfile(userId);
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
    console.log("Closing the modal");
    setShowModal(false);
  };
const isOwnProfile = !userId || userId === store.currentUser.id;

  // Mostrar spinner si no se ha cargado la información del usuario
  if (!store.currentUser || (userId && !store.otherUserProfile)) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container profile-container" style={{ position: "relative" }}>
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
                <button
                  className="btn btn-primary"
                  style={{ borderRadius: "5px" }}
                  onClick={handleOpenModal}
                >
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