import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProfileHeader } from "../component/userProfile/profileHeader";
import { Tabs } from "../component/userProfile/tabs";
import { RecipeList } from "../component/userProfile/tabViews/recipeList";
import { FavoriteRecipes } from "../component/userProfile/tabViews/favoriteRecipes";

export const UserDetails = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("misRecetas");
  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching profile and recipes for user:", id);
    actions.getOtherUserProfile(id);
    actions.getOtherUserRecipes(id);
    store.listaDeRecetasDeOtroUsuario
    store.listaDeRecetasPublicadas
  }, [id]);

  const isProfile = store.currentUser && store.currentUser.id === id;
  const userRecipes = Array.isArray(store.listaDeRecetasDeOtroUsuario)
    ? store.listaDeRecetasDeOtroUsuario
    : [];
  if (!store.otherUserProfile) {
    return <div>Cargando perfil...</div>;
  }
  
  return (
    <div className="container profile-container" style={{ position: "relative" }}>
      <ProfileHeader  user={store.otherUserProfile} isProfile={isProfile} />
      <Tabs isProfile={isProfile} setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="tab-content">
        {activeTab === "misRecetas" && (<RecipeList isProfile={isProfile} recipes={userRecipes} store={store} actions={actions} />)}
        {activeTab === "favoritas" && <FavoriteRecipes store={store} actions={actions} />}
      </div>
    </div>
  );
};