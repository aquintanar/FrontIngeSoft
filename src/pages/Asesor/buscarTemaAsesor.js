import React from 'react'
import './proponerTemaAsesor.css';

const BuscarTemaAsesor = ({temaTesis, setTemaTesis}) => {
    
    return(
        <form>
            <h1 >Buscar tema de tesis</h1>
            <div className="form-group row mt-3">
                <label for="tituloTesis" className="col-md-2 col-form-label mt-2 fonnnts"> Titulo de tesis: </label>
                <div className = "col-md-10">
                    <input type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    style={{display: 'flex', height:'2vw'}} disabled value={temaTesis.tituloTesis}/>
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
                <div className = "col-md-10">
                    <input type='text' className="form-control" id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                    style={{display: 'flex', height:'2vw'}} />
                </div>
            </div>

            <div className="form-group row mt-3">
                <label for="descripcionTema" className="col-md-6 col-form-label fonnnts"> Descripcion del tema:</label>
                <div className = "col-md-12">
                    <textarea class="form-control" id="desciripcionTema" name="descripcion" rows="8" disabled value={temaTesis.descripcion}></textarea>
                </div>                
            </div>

            <div className="form-group row mt-3">
                <label for="palabraClave1" className="col-md-2 col-form-label fonnnts"> Palabra clave 1:</label>
                <div className = "col-md-4">
                    <input type='text' className="form-control" id="palabraClave1" name="palabraClave1"
                    style={{display: 'flex', height:'2vw'}} disabled value={temaTesis.palabraClave1}/>
                </div>
                <label for="palabraClave2" className="col-md-2 col-form-label fonnnts"> Palabra clave 2:</label>
                <div className = "col-md-4">
                    <input type='text' className="form-control" id="palabraClave2" name="palabraClave2"
                    style={{display: 'flex', height:'2vw'}} disabled value={temaTesis.palabraClave2}/>
                </div>
            </div>

            <div className="form-group row mt-3">
                <label for="Estado" className="col-md-2 col-form-label fonnnts"> Estado aprobacion:</label>
                <div className = "col-md-10">
                    <p className='fonnnts'> {temaTesis.estadoTema} </p>
                </div>
                <div className = "col-md-12">
                    <textarea className="form-control" id="motivoRechazo" name="motivoRechazo" rows="4" disabled value={temaTesis.feedback}></textarea>
                </div>
            </div>
        </form>
    );
}

export default BuscarTemaAsesor;