import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
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

        },
        actions: {
            registerUser: async (user_name, email, password) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_name, email, password }),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        setStore({
                            is_active: true,
                            user: { user_name, email },
                            error: null,
                        });
                        return true;
                    } else {
                        const errorResult = await response.json();
                        setStore({ error: errorResult.msg });
                        return false;
                    }
                } catch (error) {
                    setStore({ error: 'Error al conectar con el servidor' });
                    return false;
                }
            },
            traerIngredientes: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/ingredients`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });                
                    if (!response.ok) {
                        console.log("Respuesta no ok:", response.status);
                        throw new Error('Error fetching ingredients');
                    }
                    const data = await response.json();
                    console.log("Ingredientes:", data);
                    setStore({ listaDeIngredientes: data });
                    console.log("Nuevo estado de listaDeIngredientes:", getStore().listaDeIngredientes);                    
                
                } catch (error) {
                    console.error('Error:', error);
                }
            },

            traerRecetas: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/recepies`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Error fetching recepies');
                    }
                    const data = await response.json();
                    setStore({ listaDeRecetas: data });

                } catch (error) {
                    console.error('Error:', error);
                }
            },

            traerCategories: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/category`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching categories');
                    }

                    const data = await response.json();
                    console.log("categorias:",data)
                    setStore({ listaDeCategorias: data });
                } catch (error) {
                    console.error('Error:', error);
                }
            },

            traerIngredients: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/ingredients`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching ingredients');
                    }

                    const data = await response.json();
                    setStore({ listaDeIngredientes: data });
                } catch (error) {
                    console.error('Error:', error);
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
                    bodyData
                  );
                  const { data } = res;
                  const accessToken = data.access_token;
                  const withToken = !!accessToken;
                  if (withToken) {
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
                console.log('Usuario: ' + getStore().currentUser);
              },
        
              getCurrentUser: async () => {
                try {
                  const accessToken = localStorage.getItem("accessToken");
                  const res = await axios.get(
                    `${process.env.BACKEND_URL}/api/current-user`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                  );
                  const { data } = res;
                  const { current_user: currentUser } = data;
                  setStore({ currentUser, isLoggedIn: true });
                  console.log(currentUser);
                } catch (error) {
                  console.log("Error loading message from backend", error);
                  localStorage.removeItem("accessToken");
                  setStore({
                    currentUser: null,
                    isLoggedIn: false,
                  });
                }
              },
        },
    };
};

export default getState;
