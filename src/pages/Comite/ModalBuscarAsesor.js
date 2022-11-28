import React ,{useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import '../Asesor/proponerTemaAsesor.css';

import SearchAsesoresModal from "./SearchAsesoresModal";

const ModalBuscarAsesor = ({show1, setShow1, ase, setAse,conf,setConf}) =>{ 
//const ModalBuscarUsuario = ({show, setShow, asesorTesis, setAsesor, }) =>{    
  //  <SearchAsesoresModal show={show} setShow={setShow} asesorTesis={asesorTesis} setAsesor={setAsesor}/>
    const handleClose = () => setShow1(false);
    const handleShow = () => setShow1(true);
    return (
        <>
      <Modal show={show1} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Buscar Asesor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SearchAsesoresModal show1={show1} setShow1={setShow1} ase={ase} setAse={setAse} conf={conf} setConf={setConf}/>
        
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
export default ModalBuscarAsesor