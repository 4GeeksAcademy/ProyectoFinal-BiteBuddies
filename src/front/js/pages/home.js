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
				<div className="d-flex justify-content-around">
					{categorias.length > 0 ? (
						categorias.map((category) => (
							<div className="border border-primary p-3 m-5"key={category.id}>{category.name}</div>
						))
					) : (
						<p>No hay categorías disponibles.</p>
					)}
				</div>
                
            </div>
			<div>
                <h4>Recetas</h4>
				<div className="d-flex justify-content-around">
					{recetas.length > 0 ? (
						recetas.map((receta) => (
							<div className="border border-primary p-3 m-5" key={receta.id}>{receta.name}</div>
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