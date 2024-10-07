import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { SearchBar } from "./searchBar/searchBar";
import { SearchOptions } from "./searchBar/searchOptions";
import "../navbar/navBar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [searchCategory, setSearchCategory] = useState("recetas");

    useEffect(() => {
        actions.traerIngredientes();
        actions.traerUsuarios();
        actions.traerRecetas();
    }, []);

    const handleRecetasClick = () => {
        actions.switchToRecipesView();
        navigate('/');
    };

    const handleUsuariosClick = () => {
        actions.switchToUsersView();
        navigate('/');
    };

    return (
        <nav className="navbar-container row">
            <div className="col align-content-start">
                <Link to="/">
                    <i className="fa-solid fa-bowl-food shrimp-icon"></i>
                </Link>
            </div>
            
            <div className="col align-content-center">
                <SearchBar 
                actions={actions} 
                store={store} 
                handleRecetasClick={handleRecetasClick} 
                handleUsuariosClick={handleUsuariosClick} 
                />
            </div>
            <div className="col  align-content-center"> 
                    <SearchOptions
                    searchCategory={searchCategory}
                    setSearchCategory={setSearchCategory}
                    isUserView={store.isUserView}
                    switchToUsersView={handleUsuariosClick}
                    switchToRecipesView={handleRecetasClick}
                    />
            </div>
            
            <div className="ml-auto col d-flex flex-row justify-content-end">
                {store.isLoggedIn && store.currentUser?.isAdmin && (
                    <a
                        className="btn custom-button m-1"
                        href="https://scaling-engine-x5w4gvgqv9qjcvq6-3001.app.github.dev/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Administración
                    </a>
                )}
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
                        <ul className="dropdown-menu desplegable" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link className="dropdown-item desplegable-item" to={`/user-profile/`}>
                                    Perfil
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item desplegable-item" to={`/login`} onClick={actions.logout}>
                                    Cerrar sesión
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="btn custom-button m-1">Entrar</button>
                        </Link>
                        <Link to="/sign_in">
                            <button className=" custom-button-sign m-1">Registrarse</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
