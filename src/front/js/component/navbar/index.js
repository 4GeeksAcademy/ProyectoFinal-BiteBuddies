import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { SearchBar } from "./searchBar";
import "../navbar/navBar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.traerIngredientes();
        actions.traerUsuarios();
        actions.traerRecetas();
    }, []);

    return (
        <nav className="navbar-container">
            <Link to="/">
                <i className="fas fa-home home-icon"></i>
            </Link>

            <SearchBar actions={actions} store={store} />

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
                                <Link className="dropdown-item" to={`/user-profile`}>
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
