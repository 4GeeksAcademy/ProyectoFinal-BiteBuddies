import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProfileHeader } from "../component/userProfile/profileHeader";
import { Tabs } from "../component/userProfile/tabs";
import { RecipeList } from "../component/userProfile/tabViews/recipeList";
import { RecipeUploadModal } from "../component/userProfile/recipeUpLoadModal";
import { EditProfileModal } from "../component/userProfile/editProfileModal"; // Importamos el nuevo modal
import { FavoriteRecipes } from "../component/userProfile/tabViews/favoriteRecipes";
import { FavoriteChefs } from "../component/userProfile/tabViews/favoriteChefs";

export const Profile = (id) => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false); // Estado para el modal de editar perfil
  const [activeTab, setActiveTab] = useState("misRecetas");
  const [isProfile, setIsProfile] = useState(true);
  const [isLoggedIn,setIsLoggedIn]= useState(false)
  const withSession = !!store?.isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.isLoadingUser) {
      if (!store.isLoggedIn) {
        navigate("/login");
      } else {
        actions.getUserRecipes();
      }
    }
  }, [store.isLoadingUser, store.isLoggedIn]);

  const handleEditProfile = () => {
    setShowEditProfileModal(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  if (store.isLoadingUser) {
    return (
      <div className="loading-spinner">
        Cargando ... <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }
  if (!store.currentUser) {
    return <div>No se encontró el usuario.</div>;
  }

  return (
    <div className="container profile-container" style={{ position: "relative" }}>
      <ProfileHeader isProfile={isProfile} user={store.currentUser} />
      <Tabs isProfile={isProfile} handleEditProfile={handleEditProfile} setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="tab-content">
        {activeTab === "misRecetas" && <RecipeList isProfile={isProfile} store={store} actions={actions} />}
        {activeTab === "recetasFavoritas" && <FavoriteRecipes isProfile={isProfile} store={store} actions={actions} />}
        {activeTab === "chefsFavoritos" && <FavoriteChefs store={store} actions={actions} />}
      </div>
      {(activeTab === "misRecetas" || activeTab === "recetasFavoritas") && !isLoggedIn && (
      <div className="row mt-3 justify-content-center">
        <button className="btn btn-primary" style={{ borderRadius: "5px" }} onClick={handleOpenModal}>
          Subir Receta
        </button>
      </div>
      )}
    {showModal && <RecipeUploadModal show={showModal} handleClose={handleCloseModal} />}
    {showEditProfileModal && <EditProfileModal show={showEditProfileModal} handleClose={handleCloseEditProfileModal} />}
    </div>
  );
};
