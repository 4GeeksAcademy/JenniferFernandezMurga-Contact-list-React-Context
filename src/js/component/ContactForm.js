
import React, { useContext, useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Context } from "../store/appContext";
import { Modal } from "./Modal";

export const ContactForm = ({ pathname }) => {
  const { actions, getStore } = useContext(Context);
  const navigate = useNavigate();
  let params = useParams();

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  function handleAddContact(e) {
    e.preventDefault();
    console.log("agregando contacto");
    actions.addContact(newContact);
  }

  function handleEditContact(e) {
    e.preventDefault();
    console.log("Editando" + params.id);
    actions.editContact(params.id, newContact);

  }

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
        } else if (pathname === "/edit-contact") {
            await handleEditContact(e);
        }
        navigate('/');
    } catch (error) {
        console.error("Error al guardar el contacto:", error);
    }
};

useEffect(() => {
  const loadContactData = async () => {
      if (pathname === "/edit-contact") {
          const contactId = params.id;
          const store = getStore();
          const contactToEdit = store.contacts.find(contact => contact.id === parseInt(contactId));
          if (contactToEdit) {
              setNewContact(contactToEdit);
          }
      }
  };

  loadContactData();
}, [params.id, pathname, getStore]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="Tittle m-4 justify-content-center">
        <h1 className="Titles">{pathname === "/add-contact" ? "Add New Contact" : "Edit Contact"}</h1>
      </div>
      <div className="row ms-3">
        <label htmlFor="inputFullName" className="col-sm-2 col-form-label">Full Name</label>
        <div className="col-sm-12">
          <input type="text" className="form-control" id="inputText" placeholder="Full Name" onChange={handleChange} name="name" value={newContact.name} />
        </div>
      </div>
      <div className="row ms-3">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-12">
          <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={handleChange} name="email" value={newContact.email} />
        </div>
      </div>
      <div className="row ms-3">
        <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone</label>
        <div className="col-sm-12">
          <input type="number" className="form-control" id="inputPhone" placeholder="Enter phone" onChange={handleChange} name="phone" value={newContact.phone} />
        </div>
      </div>
      <div className="row ms-3">
        <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Address</label>
        <div className="col-sm-12">
          <input type="text" className="form-control" id="inputAddress" placeholder="Enter address" onChange={handleChange} name="address" value={newContact.address} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary m-3 col-sm-12">Save</button>
      
    </form>
  );
}
