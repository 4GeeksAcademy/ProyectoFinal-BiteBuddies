import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      is_active: false,
      user: null,
      error: null,
      currentUser: null,
      isLoggedIn: false,
      listaDeRecetasPublicadas: [],
      recetasSubidas: [],
      listaDeCategorias: [],
      listaDeIngredientes: [],
      listaDeUsuarios: [],
      listaDeRecetas: [],
      listaDeRecetasDeOtroUsuario:[],
      searchResult: [],
      searchResultUsers: [],
      busquedaActiva: false,
      detallesDeReceta: [],
      recetasFavoritas: [],
    },
    actions: {
      buscar: (query, searchType) => {
        const store = getStore();
        let resultadosUsers = [];

        const lowerCaseQuery = query.toLowerCase();

        if (searchType === "recetas") {
          resultadosUsers = store.listaDeRecetas.filter((receta) =>
            receta.name.toLowerCase().includes(lowerCaseQuery)
          );
          setStore({searchResultUsers: resultadosUsers});
        }
        if (searchType === "ingredientes") {
          resultadosUsers = store.listaDeIngredientes.filter((ingredient) =>
            ingredient.name.toLowerCase().includes(lowerCaseQuery)
          );
        }
        if (searchType === "usuarios") {
          resultadosUsers = store.listaDeUsuarios.filter((user) =>
            user.user_name.toLowerCase().includes(lowerCaseQuery),
          );
        }
        setStore({
          searchResultUsers: resultadosUsers,
          busquedaActiva: true,
        });
      },

      limpiarBusqueda: () => {
        setStore({
          searchResult: [],
          searchResultUsers:[],
          busquedaActiva: false,
        });
      },
      registerUser: async (user_name, first_name, last_name, email, password) => {
        const store = getStore();
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
            console.error("Server Error:", errorResult);
            setStore({
              error: errorResult.msg || "Error desconocido",
            });
            return false;
          }
        } catch (error) {
          console.error("Network Error:", error);
          setStore({
            error: "Error al conectar con el servidor",
          });
          return false;
        }
      },
      traerIngredientes: async () => {
        try {
          console.log("haciendo fetch");

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/ingredients`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (!response.ok) {
            console.log("Respuesta no ok:", response.status);
            throw new Error("Error fetching ingredients");
          }
          const data = await response.json();
          console.log("Ingredientes:", data);
          setStore({
            listaDeIngredientes: data,
          });
          console.log(
            "Nuevo estado de listaDeIngredientes:",
            getStore().listaDeIngredientes,
          );
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
            throw new Error("Error al obtener usuarios");
          }
          const data = await response.json();
          setStore({ listaDeUsuarios: data }); // Guardar todos los usuarios en el store
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
        }
      },
  getOtherUserProfile: async (userId) => {
  console.log("userID", userId);
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`); 
    console.log("API response for profile:", response);
    if (!response.ok) {
      throw new Error("Error al obtener el perfil del usuario");
    }
    const data = await response.json();
    console.log("Profile data:", data);
    setStore({ otherUserProfile: data });
    console.log("Profile stored in state:", data);
  } catch (error) {
    console.error("Error al obtener el perfil de otro usuario:", error);
  }
},

  getOtherUserRecipes: async (userId) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}/recipes`);
    const data = await response.json();

    // Si la respuesta es un array, significa que las recetas se obtuvieron correctamente
    if (Array.isArray(data)) {
      setStore({ listaDeRecetasDeOtroUsuario: data });
    } 
    // Si la respuesta tiene un objeto con un mensaje, significa que no se encontraron recetas
    else if (data.message) {
      console.error("Mensaje del servidor:", data.message);
      setStore({ listaDeRecetasDeOtroUsuario: [] }); // Asegurar que siempre sea un array vacío en este caso
    } 
    // Manejo de cualquier otra respuesta inesperada
    else {
      console.error("Respuesta inesperada del servidor:", data);
      setStore({ listaDeRecetasDeOtroUsuario: [] });
    }
  } catch (error) {
    console.error("Error al obtener las recetas del otro usuario:", error);
    setStore({ listaDeRecetasDeOtroUsuario: [] }); // Asegurar que siempre sea un array en caso de error
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
          const res = await axios.post(`${process.env.BACKEND_URL}/api/login`, bodyData);
          const { data } = res;
          const accessToken = data.access_token;
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            await getActions().getCurrentUser();
            return true;
          }
          return false;
        } catch (error) {
          console.log("Error loading message from backend", error);
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
          const res = await axios.get(`${process.env.BACKEND_URL}/api/current-user`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { usuario_actual: currentUser } = res.data;
          setStore({
            currentUser,
            isLoggedIn: true,
          });
        } catch (error) {
          console.log("Error loading message from backend", error);
          localStorage.removeItem("accessToken");
          setStore({
            currentUser: null,
            isLoggedIn: false,
          });
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

      publicarReceta: async (name, description, steps, ingredients_ids, category_ids, image) => {
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
              image_url: image,
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
            setStore({
              listaDeRecetas: [...store.listaDeRecetas, newRecipe],
              listaDeRecetasPublicadas: [...store.listaDeRecetasPublicadas, newRecipe],
            });

            alert("Receta publicada exitosamente!");
          }
        } catch (error) {
          console.error("Error al publicar la receta:", error);
        }
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
              ingredients: data.ingredients, // Lista de ingredientes
              categories: data.categories, // Lista de categorías
              uploaded_by_user: data.uploaded_by_user, // Info del usuario que subió la receta
              is_official: data.is_official,
            },
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },

      getUserRecipes: async () => {
        const store = getStore();
        const accessToken = localStorage.getItem("accessToken");

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/user/recipes`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setStore({
              listaDeRecetasPublicadas: data,
              recetasSubidas: data.length,
            });
          } else {
            console.error("Error al obtener las recetas del usuario");
          }
        } catch (error) {
          console.error("Error:", error);
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
            setStore({
              recetasFavoritas: data,
            });
            return true;
          } else {
            console.error("Error al obtener los favoritos del usuario");
            return false;
          }
        } catch (error) {
          console.error("Error:", error);
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
            setStore({
              recetasFavoritas: userFavorites.favorite_recipes,
            });
            return true;
          } else {
            console.error("Error al añadir la receta a favoritos");
            return false;
          }
        } catch (error) {
          console.error("Error:", error);
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
            setStore({
              recetasFavoritas: userFavorites.favorite_recipes,
            });
            return true;
          } else {
            console.error("Error al eliminar la receta de favoritos");
            return false;
          }
        } catch (error) {
          console.error("Error:", error);
          return false;
        }
      },

      isRecipeFavorite: (recipe_id) => {
        const store = getStore();
        return store.recetasFavoritas && store.recetasFavoritas.some((recipe) => recipe.id === recipe_id);
      },
    },
  };
};

export default getState;
