import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Categories } from "../component/home/categories";
import { Recipes } from "../component/home/recipes";
import { Users } from "../component/home/users"; 
import "../component/home/homeStyles.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        actions.traerRecetas();
        actions.traerCategories();
        actions.getCurrentUser();
        actions.traerUsuarios();
        console.log("Current User HOME: ", store.currentUser);
        console.log("Usuarios: ", store.listaDeUsuarios)
    }, []);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId); 
    };

    return (
        <div className="body text-center h-100">
            <div className="titles-h m-3">
                <h1 className="bite-title">BiteBuddies</h1>
                <h4>Descubre recetas deliciosas creadas por chefs como tú</h4>
                <p>Busca, comparte y explora miles de recetas subidas por nuestra comunidad de chefs. ¡Comparte tu pasión por la cocina con el mundo!</p>
            </div>

            {store.isUserView ? (
                <Users 
                    usuarios={store.listaDeUsuarios} 
                    searchResults={store.searchResultUsers}
                    currentUser={store.currentUser}
                />
            ) : (
                <>
                    <div className="categories-container">
                        <Categories 
                            categorias={store.listaDeCategorias} 
                            selectedCategory={selectedCategory} 
                            onSelectCategory={handleSelectCategory} 
                        />
                    </div>
                    
                    <div className="recipes-container">
                        <Recipes 
                            recetas={store.listaDeRecetas} 
                            selectedCategory={selectedCategory}
                            searchResults={store.searchResultRecipes} 
                        />
                    </div>
                </>
            )}
        </div>
    );
};