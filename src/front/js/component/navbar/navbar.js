import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../navbar/navBar.css";

export const Navbar = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchCategory, setSearchCategory] = useState("ingredientes"); 
    const currentPath = location.pathname;

    useEffect(() => {
        actions.traerIngredientes();
    }, []);

    useEffect(() => {}, [search, store.searchResult, store.listaDeIngredientes]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (searchCategory === "ingredientes") {
            actions.searchIngredients(e.target.value);
        } else if (searchCategory === "recetas") {
            actions.searchRecipes(e.target.value);
        } else if (searchCategory === "usuarios") {
            actions.searchUsers(e.target.value);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchCategory === "ingredientes" && search) {
            setSelectedIngredients([...selectedIngredients, search]);
            setSearch(""); 
        }
    };

    const handleFinalSearch = () => {
        if (searchCategory === "recetas") {
            actions.searchRecipesByIngredients(selectedIngredients);
        }
    };

    const renderDropdown = () => {
        if (search && store.searchResult.length > 0) {
            return (
                <ul className="dropdown-menu show" style={{ position: "absolute", width: "100%" }}>
                    {store.searchResult.map((ingredient, index) => (
                        <li key={index} className="dropdown-item" onClick={() => addIngredient(ingredient.name)}>
                            {ingredient.name}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    const addIngredient = (ingredient) => {
        setSelectedIngredients([...selectedIngredients, ingredient]);
        setSearch(""); 
    };

    const removeIngredient = (index) => {
        const newIngredients = selectedIngredients.filter((_, i) => i !== index);
        setSelectedIngredients(newIngredients);
    };

    return (
        <nav className="navbar-container">
            <Link to="/">
                <i className="fas fa-home home-icon"></i>
            </Link>

            {currentPath === "/login" || currentPath === "/sign_in" ? (
                <h1 style={{ marginLeft: "90px" }}>Bite Buddies</h1>
            ) : currentPath.startsWith("/user-profile") ? (
                <h1>Bienvenido a tu perfil, {store.currentUser.user_name || "error"}</h1>
            ) : (
                <div className="search-container">
                    <div className="search-options">
                        <button
                            type="button"
                            className={`option-button ${searchCategory === 'ingredientes' ? 'active' : ''}`}
                            onClick={() => setSearchCategory("ingredientes")}
                        >
                            Ingredientes
                        </button>
                        <button
                            type="button"
                            className={`option-button ${searchCategory === 'recetas' ? 'active' : ''}`}
                            onClick={() => setSearchCategory("recetas")}
                        >
                            Recetas
                        </button>
                        <button
                            type="button"
                            className={`option-button ${searchCategory === 'usuarios' ? 'active' : ''}`}
                            onClick={() => setSearchCategory("usuarios")}
                        >
                            Usuarios
                        </button>
                    </div>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder={`Buscar ${searchCategory}...`}
                            value={search}
                            onChange={handleSearchChange}
                        />
                        {renderDropdown()}
                    </form>

                    <button className="btn custom-button search-btn" onClick={handleFinalSearch}>
                        Buscar
                    </button>

                    <div className="selected-ingredients">
                        {selectedIngredients.map((ingredient, index) => (
                            <span key={index} className="ingredient-tag">
                                {ingredient} <button onClick={() => removeIngredient(index)}>x</button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="ml-auto">
                {store.isLoggedIn && store.currentUser ? (
                    <div className="dropdown">
                        <button
                            className="btn custom-button dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {store.currentUser.user_name || "error"}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link className="dropdown-item" to={`/user-profile/${store.currentUser.id}`}>
                                    Perfil
                                </Link>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Favoritos
                                </a>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={`/login`} onClick={actions.logout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="btn custom-button m-1">LOGIN</button>
                        </Link>
                        <Link to="/sign_in">
                            <button className="btn custom-button m-1">SIGN IN</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};