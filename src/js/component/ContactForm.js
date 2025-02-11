import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Context } from "../store/appContext";

export const ContactForm = ({ pathname, contactToEdit }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    let params = useParams();

    const [newContact, setNewContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        if (contactToEdit) {
            setNewContact(contactToEdit); 
        }
    }, [contactToEdit]);

    const handleAddContact = (e) => {
        e.preventDefault();
        actions.addContact(newContact);
    };

    const handleEditContact = (e) => {
        e.preventDefault();
        actions.editContact(params.id, newContact);
    };

    const handleChange = (e) => {
        setNewContact({
            ...newContact,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, address } = newContact;

        // Validaciones simples
        if (!name || !email || !phone || !address) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            if (pathname === "/add-contact") {
                await handleAddContact(e);
            } else if (pathname === `/edit-contact/${params.id}`) {
                await handleEditContact(e);
            }
            navigate('/');
        } catch (error) {
            console.error("Error al guardar el contacto:", error);
        }
    };

  return (
    <form className="form m-5"onSubmit={handleSubmit}>
      <div className="Tittle m-4 justify-content-center">
        <h1 className="Titles text-center">{pathname === "/add-contact" ? "Add New Contact" : "Edit Contact"}</h1>
      </div>

      <div className="row">
        <label htmlFor="inputFullName" className="col-sm-2 col-form-label text-start">Full Name</label>
        <div className="col-sm-12">
          <input type="text" className="form-control" id="inputText" placeholder="Full Name" onChange={handleChange} name="name" value={newContact.name} />
        </div>
        </div>

        <div className="row">
        <label htmlFor="inputAddress" className="col-sm-2 col-form-label text-start">Address</label>
        <div className="col-sm-12">
          <input type="text" className="form-control" id="inputAddress" placeholder="Enter address" onChange={handleChange} name="address" value={newContact.address} />
        </div>
      </div>

     
      <div className="row ">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label text-start">Email</label>
        <div className="col-sm-12">
          <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={handleChange} name="email" value={newContact.email} />
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputPhone" className="col-sm-2 col-form-label text-start">Phone</label>
        <div className="col-sm-12">
          <input type="number" className="form-control" id="inputPhone" placeholder="Enter phone" onChange={handleChange} name="phone" value={newContact.phone} />
        </div>
      </div>
     
      <button type="submit" className="btn btn-primary mt-4 col-sm-12">Save</button>
      
    </form>
  );
}
