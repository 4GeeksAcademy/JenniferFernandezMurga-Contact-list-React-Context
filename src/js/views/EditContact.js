import React, { useContext, useEffect, useState } from "react";
import { ContactForm } from "../component/ContactForm";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { id } = useParams(); 
    const { store } = useContext(Context);
   

    const [contact, setContact] = useState({ 
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        if (contactToEdit) {
            setContact(contactToEdit); 
        }
    }, [contactToEdit]);

    
    console.log(contactToEdit);

    return (
        <div>
            {contactToEdit ? (
                <ContactForm pathname={`/edit-contact/${id}`} contactToEdit={contact} />
            ) : (
                <p className="m-5">Contacto no encontrado</p>
            )}
            <Link className="justify-content-center m-5" to="/">Get back to contact</Link>
        </div>
    );
}

