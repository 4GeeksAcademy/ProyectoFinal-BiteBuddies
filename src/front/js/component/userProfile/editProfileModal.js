import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";

export const EditProfileModal = ({ show, handleClose }) => {
  const { store, actions } = useContext(Context); 
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    profile_image: "",
  });

  useEffect(() => {
    // Pre-fill the modal with existing user data from store.currentUser
    if (store.currentUser) {
      setProfileData({
        first_name: store.currentUser.first_name || "",
        last_name: store.currentUser.last_name || "",
        bio: store.currentUser.bio || "",
        profile_image: store.currentUser.profile_image || "",
      });
    }
  }, [store.currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating profile:", profileData);
    const success = await actions.updateUserProfile(profileData, store.currentUser.id);  // Aquí debes pasar el ID del usuario
    if (success) {
      handleClose();  // Cierra el modal si la actualización es exitosa
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Perfil</h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Biografía</label>
                <textarea
                  className="form-control"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Escribe algo sobre ti"
                />
              </div>
              <div className="form-group">
                <label>URL de la imagen de perfil</label>
                <input
                  type="text"
                  className="form-control"
                  name="profile_image"
                  value={profileData.profile_image}
                  onChange={handleChange}
                  placeholder="Ingresa la URL de la imagen"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
