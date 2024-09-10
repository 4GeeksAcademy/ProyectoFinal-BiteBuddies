import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const recetas = store.listaDeRecetas;
    const categorias = store.listaDeCategorias;


    useEffect(() => {
        actions.traerRecetas();
        actions.traerCategories();
    }, []);
 
    return (
        <div className="text-center h-100">
            <div className="m-3">
                <h1>Bite Buddies</h1>
                <h4>Cocina compartiendo</h4>
            </div>
			<div>
			<div>
                <h4>Categorías</h4>
				<div className="d-flex justify-content-center">
					{categorias.length > 0 ? (
						categorias.map((category) => (
							<button className="btn-custom m-3"key={category.id}>{category.name}</button>
						))
					) : (
						<p>No hay categorías disponibles.</p>
					)}
				</div>
                
            </div>
			<div>
                <h4>Recetas</h4>
				
				<div className="d-flex justify-content-center">
					{recetas.length > 0 ? (
						recetas.map((receta) => (
							<Link key={receta.id} to={`/recipe/${receta.id}`}>
							<div className="recipe-card m-3 bg-light p-2">
							<img
							src={receta.image_url}
							alt="Receta"
							className="img-fluid"
							/>
							<p className="recipe-name">{receta.name}</p>
							</div>
							</Link>
						))
					) : (
						<p>No hay recetas disponibles.</p>
					)}
				</div>
            </div>
			</div>
        </div>
    );
};