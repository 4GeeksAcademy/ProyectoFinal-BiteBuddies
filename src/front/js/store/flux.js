import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      is_active: false,
      user: null,
      error: null,
      currentUser: null,
      isLoggedIn: false,
      isLoadingUser: true,
      listaDeRecetasPublicadas: [],
      recetasSubidas: [],
      listaDeCategorias: [],
      listaDeIngredientes: [],
      listaDeUsuarios: [],
      listaDeRecetas: [],
      listaDeRecetasDeOtroUsuario: [],
      searchResult: [],
      searchResultUsers: [],
      busquedaActiva: false,
      detallesDeReceta: [],
      recetasFavoritas: [],
      usuariosFavoritos: [],
      isUserView: false,
    },
    actions: {
      switchToRecipesView: () => {
        setStore({ isUserView: false });
      },
      switchToUsersView: () => {
        setStore({ isUserView: true });
      },
      buscar: (query, searchType) => {
        const store = getStore();
        let resultados = [];

        const lowerCaseQuery = query.toLowerCase();

        if (searchType === "recetas") {
          resultados = store.listaDeRecetas.filter((receta) =>
            receta.name.toLowerCase().includes(lowerCaseQuery)
          );
          setStore({ searchResultRecipes: resultados });
        }
        if (searchType === "usuarios") {
          resultados = store.listaDeUsuarios.filter((user) =>
            user.user_name.toLowerCase().includes(lowerCaseQuery)
          );
          setStore({ searchResultUsers: resultados });
        }

        setStore({
          busquedaActiva: true,
        });
      },

      limpiarBusqueda: () => {
        setStore({
          searchResult: [],
          searchResultUsers: [],
          busquedaActiva: false,
        });
      },

      registerUser: async (user_name, first_name, last_name, email, password, is_admin = false) => {
        try {
          if (!user_name || !first_name || !last_name || !email || !password) {
            setStore({
              error: "Todos los campos son requeridos",
            });
            return false;
          }

          const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_name,
              first_name,
              last_name,
              email,
              password,
              is_admin,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            setStore({
              is_active: true,
              user: {
                user_name,
                first_name,
                last_name,
                email,
              },
              error: null,
            });
            return true;
          } else {
            const errorResult = await response.json();
            setStore({
              error: errorResult.msg || "Error desconocido",
            });
            return false;
          }
        } catch (error) {
          setStore({
            error: "Error al conectar con el servidor",
          });
          return false;
        }
      },

      traerIngredientes: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/ingredients`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching ingredients");
          }
          const data = await response.json();
          setStore({
            listaDeIngredientes: data,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },

      traerUsuarios: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/all_users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Error al obtener usuarios: " + response.statusText);
          }

          const data = await response.json();
          setStore({ listaDeUsuarios: data });
        } catch (error) {
          console.error("Error al obtener usuarios:", error.message);
        }
      },

      traerRecetas: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/all_recipes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching recipes");
          }
          const data = await response.json();
          setStore({
            listaDeRecetas: data,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },

      traerCategories: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching categories");
          }
          const data = await response.json();
          setStore({
            listaDeCategorias: data,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },

      login: async (email, password) => {
    const bodyData = {
        email,
        password,
    };

    try {
        console.log("Enviando solicitud de login con los datos:", bodyData); // Log para ver los datos que se están enviando

        const res = await axios.post(`${process.env.BACKEND_URL}/api/login`, bodyData);

        console.log("Respuesta del servidor recibida:", res); // Log para ver la respuesta completa del servidor

        const { data } = res;
        const accessToken = res.data.token;

        if (res.data) {
            console.log("Login exitoso. Guardando el token y el usuario.");

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
            console.log("Token decodificado:", decodedToken); // Log para ver qué se decodifica del token

            const email = decodedToken.sub.email;
            const isAdmin = decodedToken.sub.is_admin;

            setStore({
                currentUser: {
                    isAdmin,
                    email,
                },
            });

            await getActions().getCurrentUser();
            return true;
        } else {
            console.log("Error: no se recibió data en la respuesta.");
            return false;
        }
    } catch (error) {
        console.log("Error al hacer login:", error.response ? error.response.data : error.message); // Log del error detallado
        return false;
    }
},

      logout: () => {
        localStorage.removeItem("accessToken");
        setStore({
          currentUser: null,
          isLoggedIn: false,
        });
      },

      getCurrentUser: async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            console.log("No se encontró un token de acceso. Saliendo...");
            setStore({ isLoadingUser: false });
            return;
          }
          console.log("Token de acceso encontrado:", accessToken);
          const res = await axios.get(`${process.env.BACKEND_URL}/api/current-user`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("Respuesta recibida:", res.data);
          const { usuario_actual: currentUser } = res.data;
          console.log("Usuario actual obtenido de la API:", currentUser);
          const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
          console.log("Token decodificado:", decodedToken);
          const isAdmin = decodedToken.sub.is_admin;
          console.log("¿El usuario es administrador?", isAdmin);

          setStore({
            currentUser:{
              ...currentUser,
              isAdmin:isAdmin,
            },
            isLoggedIn: true,
            isLoadingUser: false,
          });
          console.log("Estado actualizado en el store con el usuario actual y privilegios de administrador.");
        } catch (error) {
          console.error("Error al obtener el usuario actual o procesar el token:", error);
          setStore({
            currentUser: null,
            isLoggedIn: false,
            isAdmin: false,
            isLoadingUser: false,
          });
           console.log("Estado actualizado a usuario no autenticado en caso de error.");
        }
      },

      searchIngredients: (query) => {
        const store = getStore();
        const lowerCaseQuery = query.toLowerCase();

        const filteredResults = store.listaDeIngredientes.filter((ingredient) =>
          ingredient.name.toLowerCase().startsWith(lowerCaseQuery)
        );
        setStore({
          searchResult: filteredResults,
          error: null,
        });
      },

      publicarReceta: async (name, description, steps, ingredients_ids, category_ids, image_url) => {
        const store = getStore();
        const accessToken = localStorage.getItem("accessToken");

        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/api/create_recipes`,
            {
              name,
              description,
              steps,
              ingredients_ids,
              category_ids,
              image_url,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            const newRecipe = response.data.receta;
            const currentUser = { ...store.currentUser };
            currentUser.uploaded_recipes = [...currentUser.uploaded_recipes, newRecipe];
            setStore({
              currentUser,
            });
            alert("Receta publicada exitosamente!");
          }
          return true;
        } catch (error) {
          console.error("Error al publicar la receta:", error.response ? error.response.data : error);
        }
        return false;
      },

      traerDetalleDeReceta: async (id) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/recipes/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching recipe details");
          }
          const data = await response.json();

          setStore({
            detallesDeReceta: {
              id: data.id,
              name: data.name,
              description: data.description,
              steps: data.steps,
              image_url: data.image_url,
              ingredients: data.ingredients,
              categories: data.categories,
              uploaded_by_user: data.uploaded_by_user,
              is_official: data.is_official,
              comments: data.comments || [],
            },
          });

          return data;
        } catch (error) {
          console.error("Error:", error);
        }
      },
      getUserRecipes: () => {
        const store = getStore();
        const currentUser = store.currentUser;

        if (currentUser && currentUser.uploaded_recipes) {
          setStore({
            listaDeRecetasPublicadas: currentUser.uploaded_recipes,
          });
        }
      },

      getUserFavorites: async () => {
        const store = getStore();
        const accessToken = localStorage.getItem("accessToken");

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/user/favorites`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            const favorite_recipes = data.favorite_recipes;
            const favorite_users = data.favorite_users;
            setStore({
              recetasFavoritas: favorite_recipes,
              usuariosFavoritos: favorite_users,
            });
            return true;
          } else {
            const errorResponse = await response.json();
            return false;
          }
        } catch (error) {
          return false;
        }
      },

      addUserToFavorite: async (user_id) => {
        const accessToken = localStorage.getItem("accessToken");
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/users/${user_id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const userFavorites = await response.json();
            if (userFavorites && userFavorites.favorite_users) {
              const { usuariosFavoritos } = getStore();
              const nuevoUsuarioFavorito = [...usuariosFavoritos, ...userFavorites.favorite_users];
              setStore({
                usuariosFavoritos: nuevoUsuarioFavorito,
              });
            } else {
              return false;
            }
            return true;
          } else {
            const errorResponse = await response.json();
            return false;
          }
        } catch (error) {
          return false;
        }
      },
      removeUserFromFavorites: async (user_id) => {
        const accessToken = localStorage.getItem("accessToken");

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/users/${user_id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userFavorites = await response.json();
            if (userFavorites && userFavorites.favorite_users) {
              setStore({
                usuariosFavoritos: userFavorites.favorite_users,
              });
            } else {
              return false;
            }

            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      },

      addRecipeToFavorites: async (recipe_id) => {
        const accessToken = localStorage.getItem("accessToken");
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/recipes/${recipe_id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const userFavorites = await response.json();
            if (userFavorites && userFavorites.favorite_recipes && userFavorites.favorite_users) {
              setStore({
                recetasFavoritas: userFavorites.favorite_recipes,
                usuariosFavoritos: userFavorites.favorite_users,
              });
            } else {
              return false;
            }
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      },

      removeRecipeFromFavorites: async (recipe_id) => {
        const accessToken = localStorage.getItem("accessToken");

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/recipes/${recipe_id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const userFavorites = await response.json();

            if (userFavorites && userFavorites.favorite_recipes) {
              setStore({
                recetasFavoritas: userFavorites.favorite_recipes,
              });
            } else {
              return false;
            }
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      },

      isRecipeFavorite: (recipe_id) => {
        const store = getStore();
        return store.recetasFavoritas && store.recetasFavoritas.some((recipe) => recipe.id === recipe_id);
      },

      isUserFavorite: (user_id) => {
        const store = getStore();
        return store.usuariosFavoritos && store.usuariosFavoritos.some((user) => user.id === user_id);
      },
      updateUserProfile: async (profileData, userId) => {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/current-user`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
          });

          if (!response.ok) {
            throw new Error("Error en la solicitud de actualización del perfil");
          }

          const data = await response.json();

          const updatedUserResponse = await fetch(`${process.env.BACKEND_URL}/api/current-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (updatedUserResponse.ok) {
            const updatedUserData = await updatedUserResponse.json();
            setStore({ currentUser: updatedUserData.usuario_actual });
            alert("Perfil actualizado con éxito");
          }
          return true;
        } catch (error) {
          return false;
        }
      },
      getCommentsForRecipe: async (recipeId) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/recipes/${recipeId}`);
          if (!response.ok) throw new Error("Error al obtener comentarios");
          const comments = await response.json();
          return comments;
        } catch (error) {
          console.error("Error obteniendo comentarios:", error);
        }
      },
      addCommentToRecipe: async (recipeId, commentText) => {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/recipes/${recipeId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text: commentText }),
          });
          if (!response.ok) throw new Error("Error al agregar comentario");
          const newComment = await response.json();
          return newComment;
        } catch (error) {
          return null;
        }
      },
    },
  };
};

export default getState;
