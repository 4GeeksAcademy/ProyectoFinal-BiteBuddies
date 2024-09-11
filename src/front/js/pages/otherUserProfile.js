import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/stylesUserProfile.css";
import { Context } from "../store/appContext";
import { OtherUserHeader } from "../component/otherProfile/otherProfileHeader";
import { Tabs } from "../component/userProfile/tabs";
import { RecipeList } from "../component/userProfile/tabViews/recipeList";
import { FavoriteRecipes } from "../component/userProfile/tabViews/favoriteRecipes";

export const OtherUserProfile = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("misRecetas");
  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching profile and recipes for user:", id);

    actions.getOtherUserProfile(id);
    actions.getOtherUserRecipes(id);
  }, [id]);

  const userRecipes = Array.isArray(store.listaDeRecetasDeOtroUsuario)
    ? store.listaDeRecetasDeOtroUsuario
    : [];

  if (!store.otherUserProfile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container profile-container" style={{ position: "relative" }}>
      <OtherUserHeader user={store.otherUserProfile} />

      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="tab-content">
        {activeTab === "misRecetas" && (
          <>
            {userRecipes.length === 0 ? (
              <div className="text-center">
                <p>Este usuario no tiene recetas propias.</p>
              </div>
            ) : (
              <RecipeList recipes={userRecipes} />
            )}
          </>
        )}

        {activeTab === "favoritas" && <FavoriteRecipes store={store} actions={actions} />}
      </div>
    </div>
  );
};