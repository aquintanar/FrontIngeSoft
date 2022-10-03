import React from 'react'
import './proponetTemaAsesor.css';

const ProponerTemaAsesor = ({temaTesis, setTemaTesis}) => {

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
        fetch('http://44.210.195.91/api/TemaTesis/PostTemaTesis', requestInit)
        .then(res => res.json())
        .then(res => console.log(res))

        setTemaTesis({
            idTema: '',
            tituloTesis:'',
            idEstadoTemaTesis: 3,
            descripcion:'',
            palabraClave1:'',
            palabraClave2:'',
        })
    }

    return(
        <form onSubmit={handleSubmmit}>
            <div className="form-group row mt-2">
                <label for="tituloTesis" className="col-md-2 col-form-label mt-2 fonnnts"> Titulo de tesis: </label>
                <div className = "col-md-10">
                    <input onChange={handleChange} type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    placeholder="Ingrese el titulo de tesis"/>
                </div>
            </div>
            <div className="form-group row mt-2">
                <label for="asesor" className="col-md-2 col-form-label fonnnts"> Nombre asesor:</label>
                <div className = "col-md-10">
                    <p className='fonnnts2'> Ing. Covas </p>
                </div>
            </div>
            <div className="form-group row mt-2">
                <label for="coasesor" className="col-md-2 col-form-label fonnnts"> Nombre co-asesor:</label>
                <div className = "col-md-10">
                    <input onChange={handleChange} type='text' className="form-control" id="nombreCoAsesor" name="nombreCoAsesor"
                    placeholder="Elija el coasesor" disabled/>
                </div>
            </div>

            <div className="form-group row mt-2">
                <label for="descripcionTema" className="col-md-6 col-form-label fonnnts"> Descripcion del tema:</label>
                <div className = "col-md-12">
                    <textarea onChange={handleChange} class="form-control" id="desciripcionTema" name="descripcion" rows="8"></textarea>
                </div>
            </div>

            <div className="form-group row mt-2">
                <label for="palabraClave1" className="col-md-3 col-form-label fonnnts"> Palabra clave 1:</label>
                <div className = "col-md-3">
                    <input onChange={handleChange} type='text' className="form-control" id="palabraClave1" name="palabraClave1"
                    placeholder="Palabra clave 1"/>
                </div>
                <label for="palabraClave2" className="col-md-3 col-form-label fonnnts"> Palabra clave 2:</label>
                <div className = "col-md-3">
                    <input onChange={handleChange} type='text' className="form-control" id="palabraClave2" name="palabraClave2"
                    placeholder="Palabra clave 2"/>
                </div>
            </div>

            <div className="form-group row mt-2">
                <label for="Estado" className="col-md-2 col-form-label fonnnts"> Estado aprobacion:</label>
                <div className = "col-md-10">
                    <p className='fonnnts'> PENDIENTE </p>
                </div>
                <div className = "col-md-12">
                    <textarea className="form-control" id="motivoRechazo" name="motivoRechazo" rows="4" disabled></textarea>
                </div>
            </div>
            <div className="form-group row mt-2">
                <div className=" offset-md-8 col-md-1">
                    <button type="" className="btn btn-primary botonForm">
                        Cancelar
                    </button>
                </div>
                <div className="offset-md-1 col-md-1">
                    <button type="submit" className="btn btn-primary botonForm">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProponerTemaAsesor;