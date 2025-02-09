import React from "react";


export const Modal = ({ abrirModal, cerrarModal, onConfirm }) => {
  if (!abrirModal) return null;

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
            <button type="button" className="btn-close" onClick={cerrarModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar este contacto?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
