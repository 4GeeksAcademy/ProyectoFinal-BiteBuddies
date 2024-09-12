import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { RecipeCard } from "../component/recipeView/recipeCard";

export const RecipeView = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipe = store.detallesDeReceta;

  useEffect(() => {
    const loadRecipeDetailsAndFavorites = async () => {
      if (!hasFetched && id) {
        await actions.traerDetalleDeReceta(id);
        setHasFetched(true);
      }
      await actions.getUserFavorites();
      if (id) {
        const isFav = actions.isRecipeFavorite(parseInt(id));
        setIsFavorite(isFav);
      }
    };
    loadRecipeDetailsAndFavorites();
  }, [id, actions, hasFetched]);
  
  return (
    <RecipeCard recipe={recipe} user={store.currentUser} />
  );
};