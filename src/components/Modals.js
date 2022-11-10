
import React from 'react'
import '../stylesheets/Modals.css'

export const ModalPregunta = ({ isOpen, closeModal, procedimiento,objeto, elemento, children }) => {

    const handleModalDialogClick = (e) => {
        e.stopPropagation();
    }
    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={handleModalDialogClick}>
                <div class="row">
                    <div align = "center">
                        <p class= "text-white mt-2">¿Estás seguro que deseas {procedimiento} a {objeto} : <b>{elemento}</b> ? </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}


export const ModalConfirmación = ({ isOpen, closeModal, procedimiento, children }) => {

    const handleModalDialogClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={handleModalDialogClick}>
                <div align = "center">
                    <div class="row">
                        <p class= "text-white mt-5">Se ha {procedimiento} correctamente </p>
                        {children} 
                    </div>   
                </div>
            </div>
        </div>
    )
}


export const ModalComentario = ({ isOpen, closeModal, procedimiento, children }) => {

    const handleModalDialogClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog_comentario" onClick={handleModalDialogClick}>
                <div align = "center">
                    <div class="row">
                        <p class= "text-white mt-5">{procedimiento} </p>
                        {children} 
                    </div>   
                </div>
            </div>
        </div>
    )
}