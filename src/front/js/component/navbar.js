import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navBar.css"

export const Navbar = () => {
	const location = useLocation();
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");

    useEffect(() => {
        actions.traerIngredientes();
    }, []);
    
    useEffect(() => {
        // console.log("Search Input:", search);
        // console.log("Search Results:", store.searchResult);
        // console.log("Lista de Ingredientes:", store.listaDeIngredientes);
    }, [search, store.searchResult, store.listaDeIngredientes]);

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
		<nav className="navbar navbar-light bg-light">
            {location.pathname === "/login"&&(
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <Link to="/">
                            <span className="navbar-brand m-1 h1">HOME</span>
                        </Link>
                    </div>
                    <div>
                        <h1>Cocinar como en casa</h1>
                    </div>
                    <div>
                        <Link to="/login">
                                <button className="btn btn-primary m-1">LOGIN</button>
                            </Link>
                            <Link to="/sign_in">
                                <button className="btn btn-primary m-1">SIGN IN</button>
                            </Link>
                    </div>
                        

                </div>

            )}
            {location.pathname === "/sign_in"&&(
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <Link to="/">
                            <span className="navbar-brand m-1 h1">HOME</span>
                        </Link>
                    </div>
                    <div>
                        <h1>Cocinar como en casa</h1>
                    </div>
                    <div>
                        <Link to="/login">
                                <button className="btn btn-primary m-1">LOGIN</button>
                            </Link>
                            <Link to="/sign_in">
                                <button className="btn btn-primary m-1">SIGN IN</button>
                            </Link>
                    </div>
                        

                </div>

            )}
            {location.pathname === "/"&&(
                <>
                    <div className="container-fluid d-flex justify-content-between">
                        <div>
                            <Link to="/">
                                <span className="navbar-brand m-1 h1">HOME</span>
                            </Link>
                        </div>
                        <div className="m-1 w-50" style={{ position: "relative" }}>
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Buscar ingredientes..."
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                                {renderDropdown()}
                            </form>
                        </div>
                        <div className="ml-auto">
                            {store.isLoggedIn && store.currentUser ? (
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        {store.currentUser.user_name || "error"}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li>
                                            <Link className="dropdown-item" to={`/user-profile/${store.currentUser.id}`}>
                                                    Perfil
                                            </Link>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Favoritos</a></li>
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
                                <button className="btn btn-primary m-1">LOGIN</button>
                            </Link>
                            <Link to="/sign_in">
                                <button className="btn btn-primary m-1">SIGN IN</button>
                            </Link>
                                </>
                    )}
                    </div>
                    </div>
                </>
            )}
        
            <div className="container">
                
                
            </div>
</nav>
	);
};