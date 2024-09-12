import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { RecipeCard } from "../component/recipeView/recipeCard";

export const RecipeView = () => {
  const { store} = useContext(Context);
  const recipe = store.detallesDeReceta;
  
  return (
    <RecipeCard recipe={recipe} user={store.currentUser} />
  );
};