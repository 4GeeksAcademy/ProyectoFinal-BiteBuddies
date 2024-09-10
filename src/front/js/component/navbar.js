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
        <ul
          className="dropdown-menu show"
          style={{ position: "absolute", width: "100%" }}
        >
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
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">HOME</span>
        </Link>

        {currentPath === "/login" || currentPath === "/sign_in" ? (
          <h1 style={{ marginLeft: "90px" }}>Bite Buddies</h1>
        ) : currentPath.startsWith("/user-profile") ? (
          <h1>
            {/* Verificar si store.currentUser está definido */}
            Bienvenido a tu perfil, {store.currentUser?.user_name || "error"}
          </h1>
        ) : (
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
        )}

        <div className="ml-auto">
          {store.isLoggedIn && store.currentUser ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {store.currentUser?.user_name || "error"}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/user-profile/${store.currentUser.id}`}
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Favoritos
                  </a>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/login`}
                    onClick={actions.logout}
                  >
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
