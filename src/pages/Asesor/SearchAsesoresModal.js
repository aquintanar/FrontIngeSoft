import React ,{useState , useEffect} from "react";
import { render } from 'react-dom';
import './proponerTemaAsesor.css';
const SearchAsesoresModal = ( {show ,setShow, asesorTesis, setAsesor} ) =>{
    //setear los hooks useState
    const[Asesores , setAsesores] = useState([]);
    const[search , setSearch] = useState("");
    const URL = "https://localhost:7012/api/Asesor/GetAsesores";
    //local
        //http://34.195.33.246/
        //EC2
        // http://44.210.195.91/
    const showData = async() => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setAsesores(data)
    }
    //funcion de busqueda
    const searcher = (e) =>{
        setSearch(e.target.value) ; 
        console.log(e.target.value);
    }
     // metodo de filtrado
    let results = []
    if(!search){
        results = Asesores ; 
    }
    else {  
        results = Asesores.filter((dato) =>
        (dato.nombres+" " + dato.apeMat).toLowerCase().includes(search.toLocaleLowerCase())
        ) 
    }

    const fetchData = () =>{
        fetch('http://44.210.195.91/api/TemaTesis/GetTemaTesis')
        .then(response => {
            return response.json()
        })
        .then(data => {
            const data2 = data.getElementById('codigoPUCP');
            console.log(data) ; 
            setAsesores(data) ; 
        })
    }

    useEffect(()=>{
        showData()
        fetchData()
    },[])

    
    
 

    return (
        <div class = "container">
            <div class = "row">
                <div class = "col-9">
                <h1 class = "cambiar-color HEADER-TEXT1">Buscar asesores</h1>
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
                            <th scope="col">Ver</th>                        
                            </tr> 
                        </thead>

                        <tbody>
                            {results.map((asesores)=> (
                                <tr key = {asesores.idUsuario}>
                                    <td>{asesores.idUsuario}</td>
                                    <td>{asesores.nombres + " " + asesores.apeMat }</td>
                                    <td><button className = "btn BUTTON_TABLA" onClick={()=>{ 
                                        setAsesor({
                                            idUsuario: asesores.idUsuario,
                                            nombres: asesores.nombres,
                                            apeMat: asesores.apeMat,
                                        }); setShow(false)}}
                                        >Seleccionar</button></td>
                                </tr>

                            ))}
                        </tbody>

                    </table> 
        </div>
        
    )
}

export default SearchAsesoresModal