


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
					// Aquí podría llamar a getContactList para actualizar la lista de contactos
					await getActions().getContactList();
				} catch (error) {
					console.error(error);
				}
			}
			,
			editContact: async (id, contact) => {
				const store = getStore();
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/JenniferF/contacts/${id}`, {
						method: "PUT",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					});
			
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
			
					const data = await response.json();
			
					const updatedList = store.contacts.map(existingContact => {
						if (existingContact.id == id) {
							return data; // Actualizar el contacto con los nuevos datos
						}
						return existingContact; // Devolver el contacto sin cambios
					});
			
					setStore({ contacts: updatedList });
			
				} catch (error) {
					console.error('Error editing contact:', error);
				}
			}
			
		
		,
		removeContact: async (id) => {
			try {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/JenniferF/contacts/${id}`, {
					method: "DELETE",
				});
		
				console.log(response);
		
				if (response.ok) {
					const store = getStore();
					const updatedContacts = store.contacts.filter(contact => contact.id !== id);
					setStore({ contacts: updatedContacts });
					console.log(`Contact with ID ${id} deleted`);
				} else {
					console.log("Error deleting contact");
				}
			} catch (error) {
				console.log("An error occurred:", error);
			}
		}
		
		
	
		}

	}
};

export default getState;
