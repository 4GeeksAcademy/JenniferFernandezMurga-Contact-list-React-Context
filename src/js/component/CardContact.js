import React, { useState, useContext } from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { Context } from "../store/appContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

export const CardContact = ({ id, address, phone, email, name }) => {
  const { store, actions } = useContext(Context);
  const [abrirModal, setAbrirModal] = useState(false);

  const cambiarModal = (estado) => {
    setAbrirModal(estado);
  };

  const eliminarContacto = async () => {
    console.log("Eliminando contacto con ID:", id);
    await actions.removeContact(id); // Espera a que se complete la eliminación
    console.log("Contacto eliminado. Cerrando modal.");
    cambiarModal(false); // Cierra el modal después de eliminar
  };

  return (

    <div className="card mb-3" style={{maxWidth:"80%"}}>

      <div className="row g-0 d-flex justify-content_between">

        <div className="col-md-4">
          <img src="https://dexterseries.ru/wp-content/uploads/2020/05/240px-dextermorgan.jpg" className="img-fluid rounded-start" alt="..."/>
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-name">Name: {name}</h5>
            <p className="card-email">Email: {email}</p>
            <p className="card-phone">Phone: {phone}</p>
            <p className="card-address">Address: {address}</p>
        </div>
      </div>

      <div className="row col-2 boton-link m-3">
          <Link to={`/edit-contact/${id}`} className="btn btn-success">
            <CiEdit />
          </Link>

          <button className="btn btn-danger m-1" onClick={() => cambiarModal(true)}>
            <MdDeleteForever />
          </button>
        </div>

      <Modal abrirModal={abrirModal} cerrarModal={() => cambiarModal(false)}>
        <div>
          <h4>¿Estás seguro de que deseas eliminar este contacto?</h4>
          <button className="btn btn-danger" onClick={eliminarContacto}>
            Confirmar
          </button>
          <button className="btn btn-secondary" onClick={() => cambiarModal(false)}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
    </div>
  );
};
