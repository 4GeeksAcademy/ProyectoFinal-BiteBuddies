import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../userProfile/styles.css";

export const ProfileHeader = ({ user, isProfile  }) => {

  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("User ID or favoritos changed");
    actions.getUserRecipes();
    const checkFavoriteStatus = () => {
      const isUserFavorite = actions.isUserFavorite(user.id);
      setIsFavorite(isUserFavorite);
    };
    checkFavoriteStatus();
  }, [user.id, store.usuariosFavoritos, store.isLoggedIn]);

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
    <div className="navbar-profile d-flex justify-content-between align-items-center p-3">
      <div className="profile-photo text-center col-3 p-1">
        <img
          src={user.profile_image ? user.profile_image : "https://via.placeholder.com/150"}
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
          {!isProfile && store.isLoggedIn && (
            <button 
              className="btn-follow"
              onClick={handleFavoriteClick}
            >
              {isFavorite 
                ? <>Siguiendo <i className='bx bxs-cookie' style={{ color: '#735c20' }}></i></> 
                : <>Seguir <i className="fa-solid fa-cookie" style={{color: '#735c20'}}></i></>
              }
            </button> 
          )}
        </div>
        
        <p>{user.email || "error"}</p>
        <p>{user.uploaded_recipes ? user.uploaded_recipes.length : 0} Recetas subidas</p>
        <p>{user.bio ? user.bio : "No bio available."}</p>
      </div>
    </div>
  );
};