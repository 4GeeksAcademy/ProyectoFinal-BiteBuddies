import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/favoritesView.css";

export const FavoritesView = () => {
    const navigate = useNavigate(); 


    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`); 
    };

    return (
        <div className="favorites-container">
            <h1>Recetas Favoritas</h1>
            <div className="carousel-container">
                <div className="carousel">
                    <div className="carousel-item" onClick={() => handleRecipeClick(1)}> {}
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="https://via.placeholder.com/150/8b5e3c/FFFFFF/?text=Receta+1" alt="Receta 1" />
                                    <p className="item-name">Receta 1</p>
                                </div>
                                <div className="flip-card-back">
                                    <p>Descripción breve de la Receta 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" onClick={() => handleRecipeClick(2)}> {}
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="https://via.placeholder.com/150/8b5e3c/FFFFFF/?text=Receta+2" alt="Receta 2" />
                                    <p className="item-name">Receta 2</p>
                                </div>
                                <div className="flip-card-back">
                                    <p>Descripción breve de la Receta 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Usuarios Favoritos</h2>
            <div className="carousel-container">
                <div className="carousel">
                    <div className="carousel-item">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="https://via.placeholder.com/150/8b5e3c/FFFFFF/?text=Usuario+1" alt="Usuario 1" />
                                    <p className="item-name">Usuario 1</p>
                                </div>
                                <div className="flip-card-back">
                                    <p>Descripción breve del Usuario 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src="https://via.placeholder.com/150/8b5e3c/FFFFFF/?text=Usuario+2" alt="Usuario 2" />
                                    <p className="item-name">Usuario 2</p>
                                </div>
                                <div className="flip-card-back">
                                    <p>Descripción breve del Usuario 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};