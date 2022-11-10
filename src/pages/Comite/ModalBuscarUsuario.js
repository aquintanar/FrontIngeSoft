import React ,{useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import '../Asesor/proponerTemaAsesor.css';

import SearchUsuariosModal from "./SearchUsuariosModal";

const ModalBuscarUsuario = ({show, setShow, al, setAl,idAlum,setIdAlum}) =>{ 
//const ModalBuscarUsuario = ({show, setShow, asesorTesis, setAsesor, }) =>{    
  //  <SearchAsesoresModal show={show} setShow={setShow} asesorTesis={asesorTesis} setAsesor={setAsesor}/>
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Buscar Alumnos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SearchUsuariosModal show={show} setShow={setShow} al={al} setAl={setAl} idAlum={idAlum} setIdAlum={setIdAlum}/>
        
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
export default ModalBuscarUsuario