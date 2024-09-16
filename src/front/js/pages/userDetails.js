import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProfileHeader } from "../component/userProfile/profileHeader";
import { Tabs } from "../component/userProfile/tabs";
import { RecipeList } from "../component/userProfile/tabViews/recipeList";
import { FavoriteRecipes } from "../component/userProfile/tabViews/favoriteRecipes";
import { FavoriteChefs } from "../component/userProfile/tabViews/favoriteChefs";

export const UserDetails = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("misRecetas");
  const { id } = useParams();

  useEffect(() => {
    actions.traerUsuarios(id);
  }, [id]);

  const isProfile = store.currentUser && store.currentUser.id === id;
  const visitedUser = store.listaDeUsuarios.find(user=> user.id === parseInt(id));

 
  if (!visitedUser) {
    return (
      <div className="loading-spinner">
        Cargando chef ... <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
      );
  }
  return (
    <div className="container profile-container" style={{ position: "relative" }}>
      <ProfileHeader  user={visitedUser} isProfile={isProfile} />
      <Tabs isProfile={isProfile} setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="tab-content">
        {activeTab === "misRecetas" && (<RecipeList isProfile={isProfile} visitedUser={visitedUser} store={store} />)}
        {activeTab === "recetasFavoritas" && <FavoriteRecipes isProfile={isProfile} visitedUser={visitedUser} store={store}/>}
        {activeTab === "chefsFavoritos" && <FavoriteChefs isProfile={isProfile} visitedUser={visitedUser} store={store}/>}
      </div>
    </div>
  );
};