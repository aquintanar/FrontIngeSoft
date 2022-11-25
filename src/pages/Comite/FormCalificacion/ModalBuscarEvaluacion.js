import React ,{useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../Asesor/proponerTemaAsesor.css';

import SearchEvaluacionModal from "./SearchEvaluacionModal";

const ModalBuscarEvaluacion = ({show, setShow, listEvaluacionesModal, evaluacion, setEvaluacion, listaEvaluaciones}) =>{ 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
      <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                    <Modal.Title>Buscar entregas o presentaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <SearchEvaluacionModal  show={show} setShow={setShow} listEvaluacionesModal={listEvaluacionesModal} 
                                            evaluacion={evaluacion} setEvaluacion={setEvaluacion}  
                                            listaEvaluaciones={listaEvaluaciones}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="BUTTON_TABLA">
                        Cancelar
                    </Button>
            </Modal.Footer>
      </Modal>
     </>
    )
}
export default ModalBuscarEvaluacion