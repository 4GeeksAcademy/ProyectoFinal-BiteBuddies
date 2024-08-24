import React from "react";
import "../../styles/stylesUserProfile.css";

export const UserProfile = () => {
    return (
        <div className="container profile-container">
            <div className="row">
                {}
                <div className="col-12">
                    <div className="navbar-profile d-flex justify-content-between align-items-center p-3 bg-light">
                        <button className="btn btn-outline-primary">Home</button>
                        <h2>Bienvenido a tu perfil</h2>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                UserName
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                {}
                <div className="col-md-4">
                    <div className="profile-sidebar bg-light p-3">
                        <div className="profile-photo mb-3">
                            <img src="https://via.placeholder.com/150" alt="Foto de perfil" className="img-fluid rounded-circle" />
                        </div>
                        <div className="profile-info">
                            <p>Nombre (opcional)</p>
                            <p>Nombre de usuario</p>
                            <p>email@example.com</p>
                            <p>5 Recetas subidas</p>
                            <button className="btn btn-outline-primary">Mis favoritos</button>
                        </div>
                    </div>
                </div>

                {}
                <div className="col-md-8">
                    <div className="recipes-section">
                        <h3>Mis recetas</h3>
                        <div className="row">
                            {}
                            <div className="col-md-4">
                                <div className="recipe-card bg-light p-2">
                                    <img src="https://via.placeholder.com/100" alt="Receta" className="img-fluid" />
                                    <p className="recipe-name">Nombre Receta</p>
                                </div>
                            </div>
                            {}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};