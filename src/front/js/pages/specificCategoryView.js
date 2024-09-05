import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/specificCategoryView.css"


export const SpecificCategoryView = () => {
  const { store, actions } = useContext(Context);
  const { category } = useParams(); 

  useEffect(() => {
    actions.fetchRecipesByCategory(category);
  }, [category]);

  return (
    <div className="category-container">
      <h1 className="category-title">Recetas de {category}</h1>
      <div className="recipes-list">
        {store.recipes && store.recipes.length > 0 ? (
          store.recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h2 className="recipe-name">{recipe.name}</h2>
              <p className="recipe-description">{recipe.description}</p>
            </div>
          ))
        ) : (
          <p className="no-recipes">No hay recetas disponibles para esta categoría.</p>
        )}
      </div>
    </div>
  );
};