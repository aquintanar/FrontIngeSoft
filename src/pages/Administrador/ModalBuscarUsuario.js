import React ,{useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
//import '..//proponerTemaAsesor.css';
import '../Asesor/proponerTemaAsesor.css';

//import SearchAsesoresModal from "./SearchAsesoresModal";
import SearchUsuariosModal from "./SearchUsuariosModal";

const ModalBuscarUsuario = ({show, setShow, docentes, setDocentes, coordinadores, setCoord}) =>{ 
//const ModalBuscarUsuario = ({show, setShow, asesorTesis, setAsesor, }) =>{    
  //  <SearchAsesoresModal show={show} setShow={setShow} asesorTesis={asesorTesis} setAsesor={setAsesor}/>
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Buscar Docentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SearchUsuariosModal show={show} setShow={setShow} docentes={docentes} setDocentes={setDocentes}  coordinadores={coordinadores} setCoord={setCoord}/>
        
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