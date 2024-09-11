import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Categories } from "../component/home/categories";
import { Recipes } from "../component/home/recipes";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const recetas = store.listaDeRecetas;
    const categorias = store.listaDeCategorias;

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        actions.traerRecetas();
        actions.traerCategories();
    }, []);

    return (
        <div className="text-center h-100">
            <div className="m-3">
                <h1>Bienvenido a Bite Buddies</h1>
                <h4>Descubre recetas deliciosas creadas por chefs como tú</h4>
                <p>Busca, comparte y explora miles de recetas subidas por nuestra comunidad de chefs. ¡Comparte tu pasión por la cocina con el mundo!</p>
            </div>
            <Categories 
                categorias={categorias} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />
            <Recipes 
                recetas={recetas} 
                selectedCategory={selectedCategory} 
            />
        </div>
    );
};