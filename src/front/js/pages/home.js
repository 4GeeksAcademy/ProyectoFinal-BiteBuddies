import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Categories } from "../component/home/categories";
import { Recipes } from "../component/home/recipes";
import { Users } from "../component/home/users"; 
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await Promise.all([
                    actions.traerRecetas(),
                    actions.traerCategories(),
                    actions.traerUsuarios()
                ]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [actions]);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId); 
    };

    return (
        <div className="text-center h-100">
            <div className="m-3">
                <h1>Bienvenido a Bite Buddies</h1>
                <h4>Descubre recetas deliciosas creadas por chefs como tú</h4>
                <p>Busca, comparte y explora miles de recetas subidas por nuestra comunidad de chefs. ¡Comparte tu pasión por la cocina con el mundo!</p>
            </div>

            {store.isUserView ? (
                <Users 
                    usuarios={store.listaDeUsuarios} 
                    searchResults={store.searchResultUsers}
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
