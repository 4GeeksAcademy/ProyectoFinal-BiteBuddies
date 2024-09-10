import axios from "axios";

const getState = ({
  getStore,
  getActions,
  setStore
}) => {
  return {
    store: {
      is_active: false,
      user: null,
      error: null,
      currentUser: null,
      isLoggedIn: false,
      listaDeRecetas: [],
      listaDeCategorias: [],
      listaDeIngredientes: [],
      searchResult: [],
      detallesDeReceta:[],
    },
    actions: {
      registerUser: async (user_name, first_name, last_name, email, password) => {
    const store = getStore();
    try {
        if (!user_name || !first_name || !last_name || !email || !password) {
            setStore({
                error: 'Todos los campos son requeridos',
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
            console.error('Server Error:', errorResult);
            setStore({
                error: errorResult.msg || 'Error desconocido',
            });
            return false;
        }
    } catch (error) {
        console.error('Network Error:', error);
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

      traerRecetas: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/all_recipes`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error('Error fetching recepies');
          }
          const data = await response.json();
          setStore({
            listaDeRecetas: data
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },


      traerCategories: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching categories");
          }

          const data = await response.json();
          console.log("categorias:", data);
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
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/login`,
            bodyData,
          );
          const {
            data
          } = res;
          const accessToken = data.access_token;
          const withToken = !!accessToken;
          if (withToken) {
            localStorage.setItem("accessToken", accessToken);
            await getActions().getCurrentUser();
            console.log(accessToken);
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
        console.log("Usuario: " + getStore().currentUser);
      },

      getCurrentUser: async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const res = await axios.get(
            `${process.env.BACKEND_URL}/api/current-user`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const {
            usuario_actual: currentUser
          } = res.data;

          setStore({
            currentUser,
            isLoggedIn: true,
          });

          console.log("currentUser:", currentUser);
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
          ingredient.name.toLowerCase().startsWith(lowerCaseQuery),
        );

        setStore({
          searchResult: filteredResults,
          error: null,
        });
      },
  publicarReceta: async (name, description, steps, ingredients_ids, category_ids, image) => {
  console.log("publicarReceta ha sido llamada");

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
        image_url: image, // Enviar la URL de la imagen
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Si el backend devuelve la receta completa, actualiza el estado con la receta recibida
    if (response.status === 201) {
      const newRecipe = response.data.receta; // Asegúrate de que aquí esté la receta completa

      setStore({
        listaDeRecetas: [...store.listaDeRecetas, newRecipe],  // Agrega la nueva receta al estado
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
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching recipe details');
        }
        
        const data = await response.json();
        console.log("Detalles de la receta:", data);
        
        setStore({
            detallesDeReceta: {
                id: data.id,
                name: data.name,
                description: data.description,
                steps: data.steps,
                image_url: data.image_url,
                ingredients: data.ingredients, // Lista de ingredientes
                categories: data.categories,   // Lista de categorías
                uploaded_by_user: data.uploaded_by_user, // Info del usuario que subió la receta
                is_official: data.is_official
            }
        });
    } catch (error) {
        console.error("Error:", error);
    }
},
    },
  };
};

export default getState;