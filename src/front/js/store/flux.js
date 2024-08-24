const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            is_active: false,
            user: null,
            error: null,
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
        },
    };
};

export default getState;
