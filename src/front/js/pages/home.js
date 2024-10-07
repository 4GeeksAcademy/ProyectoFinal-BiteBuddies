import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Categories } from "../component/home/categories";
import { Recipes } from "../component/home/recipes";
import { Users } from "../component/home/users";
import Select from "react-select";
import "../component/home/homeStyles.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [ingredientsOptions, setIngredientsOptions] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        let isMounted = true;
        actions.traerRecetas();
        actions.traerCategories();
        actions.traerUsuarios();
        actions.getCurrentUser();

        const cargarIngredientes = async () => {
            try {
                await actions.traerIngredientes();
                const mapearIngredientes = store.listaDeIngredientes.map((ingrediente) => ({
                    value: ingrediente.id,
                    label: ingrediente.name,
                }));                
                setIngredientsOptions(mapearIngredientes);
            } catch (error) {
                console.log("Error al cargar los ingredientes:", error);
            }
        };
        cargarIngredientes();
        return () => {
            isMounted = false;};
    }, []); 

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const filtrarRecetasPorIngredientes = (selectedIngredients) => {
        const recetasFiltradas = store.listaDeRecetas.filter((receta) => {
            const recetaIngredienteIds = receta.ingredients.map(ingrediente => ingrediente.id)       
            return selectedIngredients.some((ingredienteId)=> recetaIngredienteIds.includes(ingredienteId));
        });
        setFilteredRecipes(recetasFiltradas);
    };
    const handleIngredientsChange = (selectedOptions) => {
    const selectedIngredients = (selectedOptions || []).map((option) => ({
        id: option.value,
        name: option.label,
    }));
    setSelectedIngredients(selectedIngredients);
    filtrarRecetasPorIngredientes(selectedIngredients.map(ingrediente => ingrediente.id));
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
                    <div className="form-group">
                        <Select
                            className="custom-select"
                            isMulti
                            options={ingredientsOptions}
                            onChange={handleIngredientsChange}
                            value={ingredientsOptions.filter((option) =>
                                selectedIngredients.some(selected => selected.id === option.value)
                            )}
                            placeholder="¿Con qué vas a cocinar?"
                        />
                    </div>
                    <div className="recipes-container">
                    {selectedIngredients.length > 0 ? ( 
                        filteredRecipes.length > 0 ? ( 
                            <Recipes 
                                recetas={filteredRecipes}
                                selectedCategory={selectedCategory}
                                searchResults={store.searchResultRecipes} 
                            />
                        ) : (
                            <p>No se encontraron recetas con los ingredientes seleccionados.</p>
                        )
                    ) : (
                        <Recipes 
                            recetas={store.listaDeRecetas} 
                            selectedCategory={selectedCategory}
                            searchResults={store.searchResultRecipes} 
                        />
                    )}
</div>
                </>
            )}
        </div>
    );
};
