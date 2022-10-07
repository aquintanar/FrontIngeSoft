import React ,{useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SearchAsesoresModal from "./SearchAsesoresModal";
const ModalBuscarAsesor = ({show, setShow, asesorTesis, setAsesor}) =>{    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Buscar Asesor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SearchAsesoresModal show={show} setShow={setShow} asesorTesis={asesorTesis} setAsesor={setAsesor}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     </>
    )
}
export default ModalBuscarAsesor