import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
//import './DatosEspecilidad.css';
import axios from 'axios';

const url= "https://localhost:7012/api/Semestre/";
const urlFacu= "https://localhost:7012/api/Facultad/";
const urlEsp= "https://localhost:7012/api/Especialidad/";


const anio= new Date().getFullYear;

function DatosSemestre() {
    let navigate = useNavigate();
    const [facus, setFacus] = useState([]);
    const [selected, setSelected] = useState(1);
    const [esp, setEsp] = useState([]);
    const [semestreSeleccionada, setSemestreSeleccionada]=useState({
      idSemestre: 0,
      nombre: '',
      anho: 0,
      numSemestre: 0,
      enCurso: '',
      idEspecialidad: 0,
      estado: 1
    })

    const handleChange=e=>{
        const {name, value}=e.target;
        setSemestreSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }))
        console.log(semestreSeleccionada);
    }

    const cambioSelect =e=>{
        console.log(e.target.value);
        setSelected(e.target.value);
        setSelected(e.target.value);
        console.log(selected);
      }

    const petitionFacu=async()=>{
        await axios.get(urlFacu+"GetFacultades/")
        .then(response=>{
          console.log(response);
          setFacus(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
    }
    
    const petitionEsp=async()=>{
      await axios.get(urlEsp+"GetEspecialidades/")
      .then(response=>{
        console.log(response);
        setEsp(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }

    const peticionPost=async()=>{
        console.log(semestreSeleccionada);
        await axios.post(url+"PostSemestre",semestreSeleccionada,{
            _method: 'POST'
          })
        .then(response=>{
          console.log("bieeeeen");
        }).catch(error =>{
          console.log(error.message);
        })
      }

    useEffect(()=>{
        petitionFacu();
        petitionEsp();
     },[])

  return (
    <div class="container">
        <div class="row">
            <p class="text-start textAzul fs-1 mt-5 fw-bold">Gestión General</p>
            <p class="text-start text-azul-principal fs-3 mb-4 fw-bold">Gestión de Semestre Académico - Modificar Semestre</p>
        </div> 
            <div class="row">
                <div class="col-4" >
                    <div class="text-start fs-5 fw-normal  mb-1">Especialidad</div>
                    <div class="input-group mb-3 ">
                    <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelect} >
                      {esp.map(elemento=>(
                        <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                      ))} 
                    </select>
                  </div>
                </div>

                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Año</div>
                  <div class="input-group input-group-lg mb-3">
                    <input type="number" class="form-control" name="anho" value={anio} aria-label="anho" aria-describedby="inputGroup-sizing-lg" onChange={handleChange}/>
                  </div>
                </div>

                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Semestre</div>
                  <div class="input-group input-group-lg mb-3">
                    <input type="number" class="form-control" name="anho" placeholder='anio' aria-label="anho" aria-describedby="inputGroup-sizing-lg" onChange={handleChange}/>
                  </div>
                </div>

                <div class= "col-3">
                  <div class="fs-5 fw-normal  mb-1 ">Facultad</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelect} >
                    {facus.map(elemento=>(
                      <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
                    ))} 
                  </select>
                </div>

            </div>

            <div class = "row">
              <p class="text-start text-azul-principal fs-3 mt-5 mb-4 fw-bold">Gestión de Semestre Académico - Modificar Semestre</p>
            
            
            </div>
        

            <div class="row">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold me-3 tableAzul" type="button" onClick={()=>{navigate("../gestion/gesSemestre")}}>Cancelar</button>
                    <button class="btn btn-primary fs-4 fw-bold tableAzul" type="button" onClick={()=>peticionPost()}>Guardar</button>
                </div>
            </div>
    </div>
  )
}

export default DatosSemestre