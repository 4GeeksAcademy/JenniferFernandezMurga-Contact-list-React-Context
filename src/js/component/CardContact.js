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
    <div className="container m-2">
      <div className="d-flex justify-content-between ">
        {/* <img src="https://img.freepik.com/fotos-premium/retrato-de-homem-de-negocios-e-expressao-facial-seria-com-fundo-de-estudio-para-espaco-de-copia-com-flare-pessoa-corporativa-com-foco-de-pensamento-e-duvida-facial-procura-dilema-ou-concentracao_590464-84924.jpg" className="rounded"/> */}
        <div className="Info p-3">
          <h5 className="card-name">Name: {name}</h5>
          <p className="card-email">Email: {email}</p>
          <p className="card-phone">Phone: {phone}</p>
          <p className="card-address">Address: {address}</p>
        </div>

        <div className="boton-link m-3">
          <Link to={`/edit-contact/${id}`} className="btn btn-success">
            <CiEdit />
          </Link>

          <button className="btn btn-danger m-1" onClick={() => cambiarModal(true)}>
            <MdDeleteForever />
          </button>
        </div>
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
  );
};
