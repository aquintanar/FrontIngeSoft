import React, {useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
//import './DatosEspecilidad.css';
import axios from 'axios';
import '../../stylesheets/Administrador.css'

const url= "https://localhost:7012/api/Especialidad/";
const urlFacu= "https://localhost:7012/api/Facultad/";

function DatosEspecialidad() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [facus, setFacus] = useState([]);
  const [subTitulo,setSubtitulo] = useState("Nueva Especialidad");

  //OBjeto especialidad--
  const [especialidadSeleccionada, setEspecialidadSeleccionada]=useState({
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      facultad: {
        idFacultad:1 
      }
  })

  //Control cambio en inputs--
  const handleChange=e=>{
    const {name, value}=e.target;
    setEspecialidadSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(especialidadSeleccionada);
  }

  //Control cambio en combo box--
  const cambioSelect =e=>{
      setEspecialidadSeleccionada(prevState=>({
        ...prevState,
        facultad:{idFacultad: e.target.value}}))
      console.log(especialidadSeleccionada);
    }

  //Lista facultades combo box--
  const petitionFacu=async()=>{
      await axios.get(urlFacu+"GetFacultades/")
      .then(response=>{
        setFacus(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
  }

  //Insertar nueva especialidad--
  const peticionPost=async()=>{
    await axios.post(url+"PostEspecialidad",especialidadSeleccionada,{
        _method: 'POST'
      })
    .then(response=>{
      navigate("../gestion/gesEspecialidad");
    }).catch(error =>{
      console.log(error.message);
    })
  }

  //Modificar especialidad--
  const peticionPut=async()=>{
    await axios.put(url+"ModifyEspecialidad",especialidadSeleccionada)
    .then(response=>{
      console.log("modificadoooo");
      navigate("../gestion/gesEspecialidad");
    }).catch(error =>{
      console.log(error.message);
    })
  }

  //Selección entre modificar o insertar
  const peticionSelecter =()=>{
    if(id==='0'){
      peticionPost();
    }
    else{
      peticionPut();  
    }
  }

  //Carga especialidad a modificar
  const cargarEspecialidad=async()=>{
    if(id!=='0'){
      const response = await axios.get(url+"GetEspecialidadXId?idEspecialidad="+parseInt(id));
      setEspecialidadSeleccionada({
        idEspecialidad: response.data[0].idEspecialidad,
        nombre: response.data[0].nombre,
        descripcion: response.data[0].descripcion,
        facultad:{idFacultad: response.data[0].idFacultad}}
      );
      setSubtitulo("Modificar Especialidad");
    }
  }

  useEffect(()=>{
    petitionFacu();
    cargarEspecialidad();
    },[])


  return (
    <div class=" REGISTRAR-ESPECIALIDAD-CONTAINER">
        <div class="row">
            <p class="GESTION-GENERAL-TEXT">Gestión General</p>
            <p class="REGISTRO-ESPECIALIDAD-TEXT">Registro de Especialidad - {subTitulo}</p>
        </div> 
            <div class="row">
                <div class="DATOS-ESPECIALIDAD" >
                    <div class="text-start fs-5 fw-normal  mb-1"><p>Nombre de la especialidad</p></div>
                    <div class="input-group mb-3 ">
                        <input type="text"  class="form-control" name="nombre" placeholder="Especialidad" 
                          onChange={handleChange} value={especialidadSeleccionada && especialidadSeleccionada.nombre} />
                    </div>
                </div>

                <div class="DATOS-ESPECIALIDAD" >
                    <div class="  fs-5 fw-normal  mb-1 "><p>Facultad</p></div>
                    <select select class="form-select Cursor"  onChange= {cambioSelect}  selected value = {especialidadSeleccionada.facultad.idFacultad} >
                      {facus.map(elemento=>
                          <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
                      )}
                    </select>
                </div>
            </div>

            <div class = "DATOS-ESPECIALIDAD">
                <div class = "col-12">
                    <div class="text-start fs-5 fw-normal "><p>Descripción</p></div>
                    <div class="input-group input-group-lg mb-3">
                        <input type="text"  class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion"  
                          onChange={handleChange} value={especialidadSeleccionada && especialidadSeleccionada.descripcion}/>
                    </div>
                </div>
            </div>
        

            <div class="row INSERTAR-ESPECIALIDAD-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../gestion/gesEspecialidad")}}><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                </div>
            </div>
    </div>
  )
}

export default DatosEspecialidad