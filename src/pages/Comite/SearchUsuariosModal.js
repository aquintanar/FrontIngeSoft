import axios from "axios";
import React ,{useState , useEffect} from "react";
import { render } from 'react-dom';
//import './proponerTemaAsesor.css';
import '../Asesor/proponerTemaAsesor.css';

const URL= "https://localhost:7012/api/Alumno/GetAlumnos";


const SearchUsuariosModal = ( {show ,setShow, al, setAl,idAlum,setIdAlum} ) =>{
    //setear los hooks useState
    const[alumnos , setAlumnos] = useState([]);
    //const[DOcentes , setDOcentes] = useState([]);
    const[search , setSearch] = useState("");
    //const URL = "http://44.210.195.91/api/Asesor/GetAsesores";
    //local
        //http://34.195.33.246/
        //EC2
        // http://44.210.195.91/
        //hacer axios aca carga tabla con setAsesores
    const showData = async() => {
        let idcur = window.localStorage.getItem("idCurso");
        const response = await axios.get("https://localhost:7012/api/Alumno/GetAlumnosxCurso?idCurso="+idcur)
        .then((response)=>{
            console.log(response.data);
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
                <h1 class = "cambiar-color HEADER-TEXT1">Buscar Alumnos</h1>
                <div class="mb-3 row">
                    <label  class="col-form-label FUENTE-LABEL">Nombre del alumno</label>
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
                            <th scope="col">Tiene Tema</th>
                            <th scope="col">Ver</th>                        
                            </tr> 
                        </thead>

                        <tbody>
                            {results.map((docs)=> (
                                <tr key = {docs.IdUsuario}>
                                    <td>{docs.IdUsuario}</td>
                                    <td>{docs.Nombres + " " + docs.ApePat }</td>
                                    <td>{docs.Correo}</td>
                                     {(() => {
                                        switch(docs.tieneTema){
                                            case false : return   <td>No tiene Tema</td>;
                        
                                            default: return <td>Sí tiene Tema</td> ;
                                    }
                                    }) ()}
                                    <td><button className = "BUTTON_TABLA" onClick={()=>{ 
                                        
                                        setAl({
                                            idAlumno: docs.IdUsuario,
                                            nombres: docs.Nombres,
                                            apeMat: docs.ApeMat,
                                            correo: docs.Correo,
                                            codigoPUCP: docs.CodigoPUCP,
                                            tieneTema: docs.tieneTema,
                                            apePat: docs.ApePat ,
                                        }); setShow(false);setIdAlum(docs.IdUsuario); }}> Seleccionar</button></td>
                                </tr>
                            ))}
                        </tbody>

                    </table> 
        </div>
        
    )
}

export default SearchUsuariosModal