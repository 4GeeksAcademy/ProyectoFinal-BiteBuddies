import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../navbar/navBar.css";

export const Navbar = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const [searchCategory, setSearchCategory] = useState("ingredientes");
    const navigate = useNavigate();

    useEffect(() => {
        actions.traerIngredientes();
        actions.traerUsuarios();
        actions.traerRecetas();
    }, []);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        if (searchCategory === "usuarios"){
            actions.buscar(e.target.value, "usuarios")
        }else if (searchCategory === "ingredientes") {
            actions.buscar(e.target.value, "ingredientes");
        }else if (searchCategory === "recetas"){
            actions.buscar(e.target.value, "recetas")
        }
    };

    const handleUserClick = (userId) => {
        console.log(userId);
    if (userId) {
        actions.traerUsuarios();
        actions.getOtherUserProfile(userId)
        navigate(`/user/${userId}`);        
        setSearch("");
    }
};

    const renderDropdown = () => {
        if (searchCategory === "usuarios" && search) {
            return (
               <ul className="dropdown-menu show" style={{ position: "absolute", width: "100%" }}>
                    {store.searchResultUsers.length > 0 ? (
                    store.searchResultUsers.map((user, index) => (
                        <li key={index} className="dropdown-item" onClick={() => handleUserClick(user.id)}>
                        {user.user_name}
                        </li>
                    ))
                    ) : (
                    <li className="dropdown-item">Buscando usuarios...</li>
                    )}
                </ul>
    );
        }
        if (search && store.searchResult.length > 0 && searchCategory !== "usuarios") {
            return (
                <ul className="dropdown-menu show" style={{ position: "absolute", width: "100%" }}>
                    {store.searchResult.map((item, index) => (
                        <li key={index} className="dropdown-item">
                            {item.name}
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

                <input
                    type="text"
                    className="search-input"
                    placeholder={`Buscar ${searchCategory}...`}
                    value={search}
                    onChange={handleSearchChange}
                />
                {renderDropdown()}
            </div>

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


