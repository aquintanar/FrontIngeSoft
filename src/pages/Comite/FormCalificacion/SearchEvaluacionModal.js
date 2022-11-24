import React ,{useState , useEffect} from "react";
import axios from 'axios';
import '../../Asesor/proponerTemaAsesor.css';

const URL= "https://localhost:7012/api/Entregable/ListEntregablesXIdCurso?idCurso=";
//const URL= "http://34.195.33.246/api/Entregable/ListEntregablesXIdCurso?idCurso=";
//const URL= "http//44.210.195.91/api/Entregable/ListEntregablesXIdCurso?idCurso=";

const SearchEvaluacionModal = ({show, setShow, listEvaluacionesModal, evaluacion, setEvaluacion, listaEvaluaciones}) =>{ 

    //setear los hooks useState
    const data = listEvaluacionesModal;
    const[search , setSearch] = useState("");
    
    const showData = async() => {
        let hash = {};
        data = data.filter(o => hash[o.idEntregable] ? false : hash[o.idEntregable] = true);
    }

    listaEvaluaciones.forEach((item) => {
        for (let index in data) {
          if (data[index].idEntregable == item.idEntregable) {
            data.splice(index, 1);
          }
        }
      });
    
    const searcher = (e) =>{                //funcion de busqueda
        setSearch(e.target.value) ; 
    }

    // metodo de filtrado
    let filtrado = []
    if(!search){
        filtrado = data ;        //results = data ;
    }
    else {  
        filtrado=filtrado.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }

    useEffect(()=>{
        console.log(data)
    },[])


    return (
        <div class = "container">
            <div class = "row">
                <div class = "col-9">
                <h1 class = "cambiar-color HEADER-TEXT1">Buscar entregas o presentaciones</h1>
                <div class="mb-3 row">
                    <label  class="col-form-label FUENTE-LABEL">Nombre de la entrega o presentación</label>
                    <div class = "col-sm-12">
                        <input value = {search} onChange = {searcher} type="text" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder=" Buscar"></input>
                    </div>
                </div>
                </div>
            </div> 
            <table class="table table-hover TABLA-BUSQ">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Fecha Límite</th>
                            <th scope="col">Acción</th>                        
                            </tr> 
                        </thead>

                        <tbody>
                            {filtrado.map((arr)=> (
                                <tr key = {arr.idEntregable}>
                                    <td>{arr.idEntregable}</td>
                                    <td>{arr.nombre}</td>
                                    <td>{arr.tipoEntregable}</td>
                                    <td>{arr.fechaLimite}</td>
                                    <td><button className = "BUTTON_TABLA" onClick={()=>{ 
                                        setEvaluacion({
                                            idEntregable:  arr.idEntregable,
                                            nombre: arr.nombre,
                                            descripcion: arr.descripcion,
                                            fechaEntregaAsesor: arr.fechaEntregaAsesor,
                                            fechaLimite: arr.fechaLimite,

                                            fechaPresentacionAlumno: arr.fechaPresentacionAlumno,
                                            fidCurso: arr.fidCurso,
                                            tipoEntregable: arr.tipoEntregable,
                                            fidNota: arr.fidNota,
                                            fidTipoEntregable: arr.fidTipoEntregable,
                                            responsableSubir: arr.responsableSubir,
                                            responsableEvaluar: arr.responsableEvaluar,
                                        }); setShow(false)}}
                                        >Seleccionar</button></td>
                                </tr>
                            ))}
                        </tbody>

                    </table> 
        </div>
        
    )
}

export default SearchEvaluacionModal