import axios from "axios";
import React ,{useState , useEffect} from "react";
import { render } from 'react-dom';
//import './proponerTemaAsesor.css';
import '../Asesor/proponerTemaAsesor.css';

const URL= "http://34.195.33.246/api/Alumno/GetAlumnos";


const SearchAsesoresModal = ( {show1 ,setShow1, ase, setAse,conf,setConf} ) =>{
    //setear los hooks useState
    const[alumnos , setAlumnos] = useState([]);
    const[search , setSearch] = useState("");
    const showData = async() => {
        let idcur = window.localStorage.getItem("idCurso");
        const response = await axios.get("http://34.195.33.246/api/Asesor/ListAsesoresXIdCurso?idCurso="+idcur)
        .then((response)=>{
            setAlumnos(response.data)
        }).catch(()=>{

        })
       
    }
    //funcion de busqueda
    const searcher = (e) =>{
        setSearch(e.target.value) ; 
        console.log(e.target.value);
    }
     // metodo de filtrado
    let results = []
    if(!search){
        results = alumnos ; 
    }
    else {  
        results = alumnos.filter((dato) =>
        (dato.nombres+" " + dato.apeMat).toLowerCase().includes(search.toLocaleLowerCase())
        ) 
    }


    useEffect(()=>{
        showData()
        //fetchData()
    },[])

    
    
 

    return (
        <div class = "container">
            <div class = "row">
                <div class = "col-9">
                <h1 class = "cambiar-color HEADER-TEXT1">Buscar Asesores</h1>
                <div class="mb-3 row">
                    <label  class="col-form-label FUENTE-LABEL">Nombre del asesor</label>
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
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Observado</th>
                            <th scope="col">Acción</th>                        
                            </tr> 
                        </thead>

                        <tbody>
                            {results.map((docs)=> (
                                <tr key = {docs.idAsesor}>
                                    <td>{docs.idAsesor}</td>
                                    <td>{docs.nombres + " " + docs.apePat + " " + docs.apeMat}</td>
                                    <td>{docs.correo}</td>
                                    <td>{docs.estaObservado===1?"Sí":"No"}</td>
                                    <td><button className = "BUTTON_TABLA" onClick={()=>{ 
                                        
                                        setAse({
                                            idAsesor: docs.idAsesor,
                                            nombres: docs.nombres ,
                                            apePat: docs.apePat,
                                            apeMat: docs.apeMat,
                                        }); setShow1(false);setConf(true); }}> Seleccionar</button></td>
                                </tr>
                            ))}
                        </tbody>

                    </table> 
        </div>
        
    )
}

export default SearchAsesoresModal