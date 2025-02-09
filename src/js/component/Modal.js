import React from "react";
import { Link } from "react-router-dom";


export const Modal = ({abrirModal, cerrarModal}) => {
    if (!abrirModal) return null;

    const borrarTarea = (id) => {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
        };
        
      fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
      .then((response) => {
        if(response.ok) {
        getTodoLista();
      }
      })
        .catch((error) => console.error(error));
      };

    

    return (
        
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    );
}