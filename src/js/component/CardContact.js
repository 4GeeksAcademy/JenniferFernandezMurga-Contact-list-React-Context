import React, { useState } from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";






export const CardContact = ({id,address,phone,email,name}) => {

  const [abrirModal, setAbrirModal] = useState (false);
  const clickAbrirModal = () => {//funcion abrir modal
    setAbrirModal(true);
  };
  const cerrarModal = () => {
    setAbrirModal(false);
  };


    return (
      <div className="container">
         <div className="d-flex justify-content-between ">
            <div className=" Info">
            {/* <img className="rounded-circle" 
            src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp" 
            alt="Imagen"  
            width="300" 
            height="250"
            /> */}
            
            <h5 className="card-name">Name: {name}</h5>
            <p className="card-email">Email: {email}</p>
            <p className="card-phone">Phone: {phone}</p>
            <p className="card-address">Adress: {address}</p>
             
            </div>
            <div className="boton-link">

           <Link to={"/edit-contact/"+id}>
       
            <button className="btn btn-success">Editar</button>
            </Link>
            
            <button className="btn btn-success" onClick={clickAbrirModal}>Eliminar</button>
            {/* //habría que poner un modal o alerta para eliminar, y vincularlo al delete de postman? */}
            </div>
        </div>
        <Modal abrirModal={abrirModal} cerrarModal={cerrarModal} />
      </div>
   
    );
}

