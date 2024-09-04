import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext"; 

export const SpecificCategoryView = () => {
    const { store, actions } = useContext(Context); 
    const { category } = useParams(); 

   
    useEffect(() => {
        actions.getRecipesByCategory(category); 
    }, [category]);

   
    const recipes = store.recipes || [];

    if (recipes.length === 0) {
        return <div>Cargando recetas...</div>; 
    }

    return (
        <div className="container specific-category-container">
            <h1>Recetas de {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <h2>{recipe.name}</h2>
                        <img src={recipe.image} alt={recipe.name} />
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};