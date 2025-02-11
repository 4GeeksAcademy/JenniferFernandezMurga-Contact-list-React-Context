import React, { useState, useContext } from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { Context } from "../store/appContext";
import { MdEdit, MdEmail, MdDeleteForever  } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

export const CardContact = ({ id, address, phone, email, name }) => {
  const { store, actions } = useContext(Context);
  const [abrirModal, setAbrirModal] = useState(false);

  const cambiarModal = (estado) => {
    setAbrirModal(estado);
  };

  const eliminarContacto = async (id) => {
    console.log("Eliminando contacto con ID:", id);
    await actions.removeContact(id); 
    console.log("Contacto eliminado. Cerrando modal.");
    cambiarModal(false);
  };

  return (

    <div className="card m-2 mx-5" style={{maxWidth:"100%"}}>

      <div className="row g-0 d-flex justify-content_between">

        <div className="col-md-3 m-3 ps-3">
        <img 
  src="https://cdna.artstation.com/p/assets/images/images/015/223/384/large/carolin-mocker-dexter-morgan-by-painting-caro-d83ujom.jpg?1547555942" 
  className="object-fit-cover border rounded-circle" 
  alt="..."
  style={{ width: "200px", height: "200px" }}
/>
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-name m-2 pb-2 fs-2"><strong>{name}</strong></h5>
            <p className="card-address"><IoLocationSharp style={{ fontSize: '20px' }} />  {address}</p>
            <p className="card-phone"><FaPhoneFlip style={{ fontSize: '20px' }}/>  {phone}</p>
            <p className="card-email"><MdEmail style={{ fontSize: '20px' }}/>  {email}</p>
            
        </div>
      </div>

      
      <div className="col-md-2 m-2">
          <Link to={`/edit-contact/${id}`} className="btn ">
          <MdEdit style={{ fontSize: '30px' }}/>
          </Link>

          <button className="btn m-2" onClick={() => cambiarModal(true)}>
            <MdDeleteForever style={{ fontSize: '30px' }} />
          </button>
      </div>

      <Modal abrirModal={abrirModal} cerrarModal={() => cambiarModal(false)} eliminarContacto={eliminarContacto} id={id}></Modal>
    </div>
    </div>
  );
};
