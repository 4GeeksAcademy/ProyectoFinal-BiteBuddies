import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
    <div className="container">
        <Link to="/">
            <span className="navbar-brand mb-0 h1">HOME</span>
        </Link>
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
</nav>
	);
};