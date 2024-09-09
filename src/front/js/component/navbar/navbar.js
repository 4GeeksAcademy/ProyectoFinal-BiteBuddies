import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../navbar/navBar.css"

export const Navbar = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const currentPath = location.pathname;

    useEffect(() => {
        actions.traerIngredientes();
    }, []);

    useEffect(() => {}, [search, store.searchResult, store.listaDeIngredientes]);

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
    <Link to="/">
        <i className="fas fa-home home-icon"></i>
    </Link>

    {currentPath === "/login" || currentPath === "/sign_in" ? (
        <h1 style={{ marginLeft: "90px" }}>Bite Buddies</h1>
    ) : currentPath.startsWith("/user-profile") ? (
        <h1>Bienvenido a tu perfil, {store.currentUser.user_name || "error"}</h1>
    ) : (
        <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar ingredientes..."
                    value={search}
                    onChange={handleSearchChange}
                />
                {renderDropdown()}
            </form>
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