import React from "react";


export const Modal = ({ abrirModal, cerrarModal, onConfirm, eliminarContacto, id }) => {
  if (!abrirModal) return null;

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure?</h5>
            <button type="button" className="btn-close" onClick={cerrarModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>If you delete this thing the entire universe will go down!</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Oh no!</button>
            <button type="button" className="btn btn-danger" onClick={()=>eliminarContacto(id)}>Yes, baby!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
