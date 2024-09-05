import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/viewOfAllCategories.css'; 

export const ViewOfAllCategories = () => {
    const navigate = useNavigate(); 

    const mainCategories = ["Desayuno", "Comida", "Cena"];

    const foodCategories = [
        "Italiana", "Mexicana", "Española", "Japonesa", 
        "Francesa", "China", "Vegana", "Vegetariana"
    ];

    const handleCategoryClick = (category) => {
        navigate(`/categories/${category.toLowerCase()}`); 
    };

    return (
        <div className="container all-categories-container">
            <div className="header">
                <h1 className="page-title">Categorías de Comida</h1>
                <p className="page-subtitle">Explora diferentes estilos culinarios</p>
            </div>
            
            <div className="categories-section">
                <h2 className="section-title">Tipos de Comida</h2>
                <div className="categories-grid">
                    {mainCategories.map((category, index) => (
                        <div 
                            key={index} 
                            className="category-card"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <h3 className="category-title">{category}</h3>
                            <div className="category-image">
                                <img src={`https://via.placeholder.com/150?text=${category}`} alt={category} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="food-categories-section">
                <h2 className="section-title">Estilos de Comida</h2>
                <div className="categories-grid">
                    {foodCategories.map((foodType, index) => (
                        <div 
                            key={index} 
                            className="category-card"
                            onClick={() => handleCategoryClick(foodType)}
                        >
                            <h3 className="category-title">{foodType}</h3>
                            <div className="category-image">
                                <img src={`https://via.placeholder.com/150?text=${foodType}`} alt={foodType} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};