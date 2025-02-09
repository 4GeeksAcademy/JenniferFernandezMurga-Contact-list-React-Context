


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
		},
		actions: {
			
			//OBtiene lista de contactos
			getContactList: async () => {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				  };

			try {
				//código que queremos ejecutar y puede dar error
			let response = await fetch("https://playground.4geeks.com/contact/agendas/JenniferF/contacts", requestOptions);
				if (response.status === 404){ //Sí no existe
					console.log("Error al crear la agenda")
					return await getActions().createAgenda();
				} if (!response.ok) {
						throw new Error(`Error al obtener contactos: ${response.statusText}`);
				}
					let result = await response.json()
					console.log(result.contacts);
					setStore({ contacts: result.contacts }); 
				
			} catch (error) {
				// Si ocurre algún error (en la red o en la API), lo mostramos en la consola.
				console.error("Error al obtener contactos:", error);
			  }
			}
	  ,
			//Crear AGENDA
		createAgenda: async () => {
			const requestOptions = {
				method: "POST",
				redirect: "follow"
			  };
			  
			  try {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/JenniferF", requestOptions);
				const result = await response.json();
				if (result.ok) {
					console.log("Agenda creada con éxito")
					await getActions().getContactList();
				} else {
				console.error("Error al crear la agenda:", response.statusText);
				} 
			}catch (error) {
				console.error(error);
			  	}
			}	
			,
			//Añadir contacto
			addContact: async (newContact) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
			
				const raw = JSON.stringify(newContact);
			
				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw // Añadiendo el cuerpo aquí
				};
			
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/JenniferF/contacts", requestOptions);
					if (!response.ok) {
						throw new Error(`Error al añadir contacto: ${response.statusText}`);
					}
					const result = await response.json();
					console.log(result);
					// Aquí podrías llamar a getContactList para actualizar la lista de contactos
					await getActions().getContactList();
				} catch (error) {
					console.error(error);
				}
			}
			,

			editContact: async (id, updatedContact) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
			
				const raw = JSON.stringify(updatedContact);
			
				const requestOptions = {
					method: "PUT",
					headers: myHeaders,
					body: raw
				};
			
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/JenniferF/contacts/${id}`, requestOptions);
					if (!response.ok) {
						throw new Error(`Error al editar contacto: ${response.statusText}`);
					}
					const result = await response.json();
					console.log(result);
					await getActions().getContactList();
				} catch (error) {
					console.error(error);
				}
			}
		
		,

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
