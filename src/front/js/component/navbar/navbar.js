import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate
import { Context } from "../../store/appContext";
import "../navbar/navBar.css";

export const Navbar = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const [searchCategory, setSearchCategory] = useState("ingredientes");
    const navigate = useNavigate(); // Inicializa useNavigate

    // Cargar los ingredientes y los usuarios cuando el componente se monte
    useEffect(() => {
        actions.traerIngredientes();
        actions.traerUsuarios();
    }, []);  // Solo ejecutarse una vez al montar el componente

    const handleSearchChange = (e) => {
        setSearch(e.target.value);

        if (searchCategory === "ingredientes") {
            actions.searchIngredients(e.target.value);
        } else if (searchCategory === "recetas") {
            actions.searchRecipes(e.target.value);
        } else if (searchCategory === "usuarios") {
            actions.searchUsers(e.target.value);  // Filtrar usuarios mientras escribes
        }
    };

    const handleUserClick = (userId) => {
    // Verificar si el ID es válido
    if (userId) {
        navigate(`/user-profile/${userId}`); // Navega a la URL con el ID del usuario
    }
};

    const renderDropdown = () => {
        if (search && store.searchResultUsers.length > 0 && searchCategory === "usuarios") {
            return (
                <ul className="dropdown-menu show" style={{ position: "absolute", width: "100%" }}>
                    {store.searchResultUsers.map((user, index) => (
                        <li key={index} className="dropdown-item" onClick={() => handleUserClick(user.id)}> {/* Cambia user.id si usas otro campo */}
                            {user.user_name}
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
                    onChange={handleSearchChange}  // Actualizar la búsqueda dinámicamente
                />
                {renderDropdown()}  {/* Renderizar el dropdown con resultados */}
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


