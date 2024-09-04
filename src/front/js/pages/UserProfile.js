import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/stylesUserProfile.css";
import { Context } from "../store/appContext";


export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const withSession = !!store?.isLoggedIn;
    const navigate = useNavigate();

    useEffect(() => {
        if (!withSession) {
        navigate("/login");
        }
    }, [withSession]);

    if (!store.currentUser) {
        return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga o un componente de carga mientras se obtienen los datos
    }
    return (
        <div className="container profile-container">
            <div className="row">
                {}
                <div className="col-12">
                    <div className="navbar-profile d-flex justify-content-center align-items-center p-3 bg-light">
                        <h2>Bienvenido a tu perfil, {store.currentUser.user_name || "error"}</h2>
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
                            <p>{store.currentUser.name || "error"}</p>
                            <p>{store.currentUser.user_name || "error"}</p>
                            <p>{store.currentUser.email || "error"}</p>
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