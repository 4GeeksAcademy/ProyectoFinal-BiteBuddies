import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navBar.css";

export const Navbar = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const currentPath = location.pathname;

    useEffect(() => {
        actions.traerIngredientes();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        actions.searchIngredients(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const renderDropdown = () => {
        if (search && store.searchResult.length > 0) {
            return (
                <ul className="dropdown-menu show" style={{ position: "absolute", width: "100%" }}>
                    {store.searchResult.map((ingredient, index) => (
                        <li key={index} className="dropdown-item">
                            {ingredient.name}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <nav className="navbar-container">
    <div className="navbar-left">
        <Link to="/">
            <i className="fas fa-home home-icon"></i> 
        </Link>
    </div>

    <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                className="search-input"
                placeholder="Buscar ingredientes..."
                value={search}
                onChange={handleSearchChange}
            />
        </form>
    </div>

    <div className="navbar-right">
        <Link to="/login">
            <button className="custom-button">LOGIN</button>
        </Link>
        <Link to="/sign_in">
            <button className="custom-button">SIGN IN</button>
        </Link>
    </div>
</nav>
    );
};