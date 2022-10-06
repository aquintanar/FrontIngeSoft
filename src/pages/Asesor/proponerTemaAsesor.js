import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import ModalBuscarAsesor from './ModalBuscarAsesor';

const ProponerTemaAsesor = ({temaTesis, setTemaTesis}) => {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);
    const handleShow = () => setShow(true);
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
        if(temaTesis.tituloTesis === '' || temaTesis.descripcion === '' ){
            alert('Campo titulo o descripcion vacios')
            return
        }
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
        fetch('https://localhost:7012/api/TemaTesis/PostTemaTesis', requestInit)
        .then(res => res.json())
        .then(res => console.log(res))

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
        <form onSubmit={handleSubmmit}>
            <h1 >Proponer tema de tesis</h1>
            <div className="form-group row mt-3">
                <label for="tituloTesis" className="col-md-2 col-form-label mt-2 fonnnts"> Titulo de tesis: </label>
                <div className = "col-md-10">
                    <input onChange={handleChange} type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    style={{display: 'flex', height:'2vw'}}/>
                </div>
            </div>
            <div className="form-group row mt-3">
                <label for="asesor" className="col-md-2 col-form-label fonnnts"> Nombre asesor:</label>
                <div className = "col-md-10">
                    <p className='fonnnts2'> Ing. Covas </p>
                </div>
            </div>
            <div className="form-group row mt-3">
                <label for="coasesor" className="col-md-2 col-form-label fonnnts"> Nombre co-asesor:</label>
                <div className = "col-md-9">
                    <input onChange={handleChange} type='text' className="form-control" id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                    style={{display: 'flex', height:'2vw'}} value={asesorTesis && (asesorTesis.nombres + " " + asesorTesis.apeMat)}/>
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

            <div className="form-group row mt-3">
                <label for="descripcionTema" className="col-md-6 col-form-label fonnnts"> Descripcion del tema:</label>
                <div className = "col-md-12">
                    <textarea onChange={handleChange} class="form-control" id="desciripcionTema" name="descripcion" rows="8"></textarea>
                </div>                
            </div>

            <div className="form-group row mt-3">
                <label for="palabraClave1" className="col-md-2 col-form-label fonnnts"> Palabra clave 1:</label>
                <div className = "col-md-4">
                    <input onChange={handleChange} type='text' className="form-control" id="palabraClave1" name="palabraClave1"
                    style={{display: 'flex', height:'2vw'}}/>
                </div>
                <label for="palabraClave2" className="col-md-2 col-form-label fonnnts"> Palabra clave 2:</label>
                <div className = "col-md-4">
                    <input onChange={handleChange} type='text' className="form-control" id="palabraClave2" name="palabraClave2"
                    style={{display: 'flex', height:'2vw'}}/>
                </div>
            </div>

            <div className="form-group row mt-3">
                <label for="Estado" className="col-md-2 col-form-label fonnnts"> Estado aprobacion:</label>
                <div className = "col-md-10">
                    <p className='fonnnts'> PENDIENTE </p>
                </div>
                <div className = "col-md-12">
                    <textarea className="form-control" id="motivoRechazo" name="motivoRechazo" rows="4" disabled></textarea>
                </div>
            </div>
            <div className="form-group row mt-3">
                <div className=" offset-md-8 col-md-1">
                    <button type="button" className="btn botonForm">
                        Cancelar
                    </button>
                </div>
                <div className="offset-md-1 col-md-1">
                    <button type="submit" className="btn btn-primary botonForm" >
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProponerTemaAsesor;