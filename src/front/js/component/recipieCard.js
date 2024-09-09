import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const recipieCard = ({ recipie }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col-md-3">
      <div className="card recipe-card">
        <img className="card-img-top" src={recipie.image} alt={recipie.name} />
        <div className="card-body">
          <h5 className="card-title">{recipie.name}</h5>
          <p className="card-text">{recipie.description}</p>
          <Link to={`/recipes/${recipie.id}`} className="btn btn-primary">
            Ver Receta
          </Link>
        </div>
      </div>
    </div>
  );
};
