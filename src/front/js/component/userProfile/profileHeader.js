import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../userProfile/styles.css";

export const ProfileHeader = ({ user, isProfile  }) => {

  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    actions.getUserRecipes();
    const checkFavoriteStatus = () => {
      const isUserFavorite = actions.isUserFavorite(user.id);
      setIsFavorite(isUserFavorite);
    };
    checkFavoriteStatus() 
  }, [user.id, store.usuariosFavoritos]);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleFavoriteClick = async ()=> {
    if(isFavorite){
      await actions.removeUserFromFavorites(user.id);
    } else {
      await actions.addUserToFavorite(user.id)
    }
    actions.getUserFavorites();
  }
  
  return (
    <div className="navbar-profile d-flex justify-content-between align-items-center p-3 bg-light">
      <div className="profile-photo text-center col-3 p-1">
        <img
          src="https://via.placeholder.com/150"
          alt="Foto de perfil"
          className="img-fluid rounded-circle"
        />
        <p>{user.user_name || "error"}</p>
      </div>
      <div className="profile-info col-5 p-1">
        <div className="d-flex justify-content-between">
          <p>
          {(user.first_name && user.last_name) 
            ? `${capitalizeWords(user.first_name.toLowerCase())} ${capitalizeWords(user.last_name.toLowerCase())}`
            : "Nombre no disponible"}
          </p>
          {!isProfile&&(
            <button 
              className="btn-follow"
              onClick={handleFavoriteClick}
            >
              {isFavorite 
                ? <>Chef Favorito <i className='bx bxs-cookie' style={{ color: '#ffffff' }}></i></> 
                : <>Seguir Chef <i className="fa-solid fa-cookie" style={{color: '#ffffff'}}></i></>
              }
            </button> 
          )}
        </div>
        
        <p>{user.email || "error"}</p>
        <p>{user.uploaded_recipes ? user.uploaded_recipes.length : 0} Recetas subidas</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>
      </div>
    </div>
  );
};