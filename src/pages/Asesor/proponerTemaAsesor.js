import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import ModalBuscarAsesor from './ModalBuscarAsesor';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import useModal from '../../hooks/useModals';

const ProponerTemaAsesor = ({temaTesis, setTemaTesis}) => {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);
    const handleShow = () => setShow(true);
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [asesorTesis, setAsesor] = useState({
        idUsuario: '',
        nombres: '',
        apeMat: '',
    })

    const handleChange = e =>{
        setTemaTesis({
            ...temaTesis,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmmit = () =>{
        //validacion
        //if(temaTesis.tituloTesis === '' || temaTesis.descripcion === '' ){
        //    alert('Campo titulo o descripcion vacios')
        //    return
        //}
        //consulta query
        const requestInit = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(temaTesis)
        }
        //local
        //https://localhost:7012/
        //EC2
        // http://44.210.195.91/
        fetch('http://44.210.195.91/api/TemaTesis/PostTemaTesis', requestInit)
        //.then(res => res.json())
        //.then(res => console.log(res))
        .then(response=>{
            closePostModal();
            openEditadoModal();
          }).catch(error =>{
            console.log(error.message);
          })

        setTemaTesis({
            idTema: 0,
            idAsesor:2,
            idAlumno: 1,
            idEstadoTemaTesis: 3,
            idArea: 1,
            idProponente: 2,
            tituloTesis:'',
            descripcion:'',
            palabraClave1:'',
            palabraClave2:'',
            feedback:'',
        })

        setAsesor({
            idUsuario: '',
            nombres: '',
            apeMat: '',
        })
    }

    return(
        <div className='CONTAINER-ASESOR'>
        <form>
            <h1 className='HEADER-TEXT1'>Proponer tema de tesis</h1>
            <div className="form-group DATOS row">
                <label for="tituloTesis" className="col-md-2 col-form-label mt-2 FUENTE-LABEL"> Título de tesis: </label>
                <div className = "col-md-10" >
                    <input onChange={handleChange} type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    style={{display: 'flex'}}/>
                </div>
            </div>
            <div className="form-group DATOS row mt-3">
                <label for="asesor" className="col-md-2 col-form-label FUENTE-LABEL"> Nombre asesor:</label>
                <div className = "col-md-10">
                    <p > Ing. Covas </p>
                </div>
            </div>
            <div className="form-group DATOS row mt-3">
                <label for="coasesor" className="col-md-2 col-form-label FUENTE-LABEL"> Nombre co-asesor:</label>
                <div className = "col-md-9">
                    <input onChange={handleChange} type='text' className="form-control" id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                    style={{display: 'flex'}} value={asesorTesis && (asesorTesis.nombres + " " + asesorTesis.apeMat)}/>
                </div>
                <div className = "col-md-1">
                    <button type="button" onClick={() => {setShow(true)}} className="btn botonForm" >
                        Coasesor
                    </button>
                    <div>
                        {<ModalBuscarAsesor show={show} setShow={setShow} asesorTesis={asesorTesis} setAsesor={setAsesor}/>}
                    </div>
                </div>
            </div>

            <div className="form-group  DATOS row mt-3">
                <label for="descripcionTema" className="col-md-6 col-form-label FUENTE-LABEL"> Descripción del tema:</label>
                <div className = "col-md-12">
                    <textarea onChange={handleChange} class="form-control" id="desciripcionTema" name="descripcion" rows={6}></textarea>
                </div>                
            </div>

            <div className="form-group DATOS row mt-3">
                <label for="palabraClave1" className="col-md-2 col-form-label FUENTE-LABEL"> Palabra clave 1:</label>
                <div className = "col-md-4">
                    <input onChange={handleChange} type='text' className="form-control" id="palabraClave1" name="palabraClave1"
                    style={{display: 'flex'}}/>
                </div>
                <label for="palabraClave2" className="col-md-2 col-form-label FUENTE-LABEL"> Palabra clave 2:</label>
                <div className = "col-md-4">
                    <input onChange={handleChange} type='text' className="form-control" id="palabraClave2" name="palabraClave2"
                    style={{display: 'flex'}}/>
                </div>
            </div>

            <div className="form-group DATOS row mt-3">
                <label for="Estado" className="col-md-2 col-form-label FUENTE-LABEL"> Estado aprobación:</label>                
                <div className = "col-md-10">
                    <p className='fonnnts'> PENDIENTE </p>
                </div>
                <label for="Estado" className="col-md-2 col-form-label FUENTE-LABEL"> Retroalimentación:</label>
                <div className = "col-md-12">
                    <textarea className="form-control" id="motivoRechazo" name="motivoRechazo" rows={3} disabled></textarea>
                </div>
            </div>
            <div className="form-group row mt-3">                
                <ModalPregunta
                    isOpen={isOpenPostModal} 
                    closeModal={closePostModal}
                    procedimiento = "proponer"
                    objeto="tema de tesis"
                    elemento={temaTesis && temaTesis.tituloTesis}
                >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                        <button class="btn  btn-success btn-lg" type="button" onClick={()=>handleSubmmit()}>Confirmar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</button>
                    </div>
                </ModalPregunta>
                <div className="col-md-10 BOTONES-FORM">
                    <button type="button" className="btn botonForm" onClick={()=>openPostModal()} >
                        Enviar
                    </button>
                </div>
                <div className="col-md-2 BOTONES-FORM">
                    <button type="button" className="btn botonForm">
                        Cancelar
                    </button>
                </div>

                <ModalConfirmación
                    isOpen={isOpenEditadoModal} 
                    closeModal={closeEditadoModal}
                    procedimiento= "propuesto"
                >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                        <button class="btn btn-success btn-lg" onClick={()=>closeEditadoModal()}>Entendido</button>
                    </div>
                </ModalConfirmación>

            </div>
        </form>
        </div>
    );
}

export default ProponerTemaAsesor;