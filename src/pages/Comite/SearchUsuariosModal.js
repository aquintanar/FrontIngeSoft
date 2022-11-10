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
        //https://localhost:7012/
        //EC2
        // http://44.210.195.91/
        //hacer axios aca carga tabla con setAsesores
    const showData = async() => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setAlumnos(data)
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
                                <tr key = {docs.idUsuario}>
                                    <td>{docs.idUsuario}</td>
                                    <td>{docs.nombres + " " + docs.apeMat }</td>
                                    <td>{docs.correo}</td>
                                     {(() => {
                                        switch(docs.tieneTema){
                                            case 0 : return   <td>No tiene Tema</td>;
                        
                                            default: return <td>Sí tiene Tema</td> ;
                                    }
                                    }) ()}
                                    <td><button className = "BUTTON_TABLA" onClick={()=>{ 
                                        
                                        setAl({
                                            idAlumno: docs.idUsuario,
                                            nombres: docs.nombres,
                                            apeMat: docs.apeMat,
                                            correo: docs.correo,
                                            codigoPUCP: docs.codigoPUCP,
                                            tieneTema: docs.tieneTema,
                                            apePat: " ",
                                        }); setShow(false);setIdAlum(docs.idUsuario); }}> Seleccionar</button></td>
                                </tr>
                            ))}
                        </tbody>

                    </table> 
        </div>
        
    )
}

export default SearchUsuariosModal