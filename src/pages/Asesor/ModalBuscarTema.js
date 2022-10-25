import React ,{useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './proponerTemaAsesor.css';
import SearchComponent from "./SearchComponent";
const ModalComponent = ({show, setShow, temaTesis, setTemaTesis}) =>{    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Buscar Tema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SearchComponent show={show} setShow={setShow} temaTesis={temaTesis} setTemaTesis={setTemaTesis}/>
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
export default ModalComponent