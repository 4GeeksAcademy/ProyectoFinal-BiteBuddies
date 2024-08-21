const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// Puedes agregar más estado aquí si es necesario
			is_active: false,
			user: null,
			error: null,
		},
		actions: {
			registerUser: async (user_name, email, password) => {
				const store = getStore();
				try {
					const response = await fetch('https://zany-chainsaw-wgrxxjjr7qr35967-3001.app.github.dev//api/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ user_name, email, password }),
					});

					if (response.ok) {
						const result = await response.json();
						// Actualizar el estado del store según el resultado
						setStore({
							is_active: true,
							user: { user_name, email },
							error: null,
						});
						return true; // Registro exitoso
					} else {
						const errorResult = await response.json();
						setStore({ error: errorResult.msg });
						return false; // Registro fallido
					}
				} catch (error) {
					setStore({ error: 'Error al conectar con el servidor' });
					return false; // Error de conexión
				}
			},
		},
	};
};

export default getState;
