import React, {useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { render } from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
//import './DatosFacultad.css';
import axios from 'axios';
import '../../stylesheets/Administrador.css'

const url= "https://localhost:7012/api/Facultad/";
const urlEspe= "https://localhost:7012/api/Especialidad/";

function DatosFacultad() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [subTitulo,setSubtitulo] = useState("Nueva Facultad");
  const [imagen, setImagen] = useState(null);
  const [espes, setEspes] = useState([]);


  const [facultadSeleccionada, setFacultadSeleccionada]=useState({
    idFacultad: 0,
    nombre: '',
    descripcion: '',
    foto: null
})

var nombreAux;
var descripcionAux;
const handleChange=  (e)=>{
    const {name, value}=e.target;
   // convertirBase64(e.target.files);
    setFacultadSeleccionada(prevState=>({
      ...prevState,
      [name]: value,
      foto: imagen
    }))
    console.log(facultadSeleccionada);
  }
 // facultadSeleccionada.foto = arrayAuxiliar[1];
const convertirBase64=(archivos)=>{
Array.from(archivos).forEach(archivo=>{
  var reader = new FileReader();
  reader.readAsDataURL(archivo);
  reader.onload=function(){
    var arrayAuxiliar=[];
    var base64 = reader.result;
    arrayAuxiliar=base64.split(',');
  /*  setFacultadSeleccionada({ 
        foto: arrayAuxiliar[1],
        nombre: nombreAux,
        descripcion: descripcionAux
    
    });*/
    facultadSeleccionada.foto = arrayAuxiliar[1];
   setImagen(arrayAuxiliar[1]);
    console.log(arrayAuxiliar[1]);
    console.log(facultadSeleccionada);
  }
  
})

}

// <img src={`data:image/jpeg;base64,${facultadSeleccionada.foto}`}

  //Control cambio en inputs--


  //Insertar nueva facultad--
  const peticionPost=async()=>{
    await axios.post(url+"PostFacultad",facultadSeleccionada,{
        _method: 'POST'
      })
    .then(response=>{
      navigate("../gestion/gesFacultad");
    }).catch(error =>{
      console.log(error.message);
    })
   // arrayAuxiliar=[];
  }

  //Modificar facultad--
  const peticionPut=async()=>{
    await axios.put(url+"PutFacultad",facultadSeleccionada)
    .then(response=>{
      console.log("modificadoooo");
      navigate("../gestion/gesFacultad");
    }).catch(error =>{
      console.log(error.message);
    })
   // arrayAuxiliar=[];
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

  //Carga facultad a modificar
  const cargarFacultad=async()=>{
    if(id!=='0'){
      const response = await axios.get(url+"GetFacultadesById?id_facultad="+parseInt(id));
      setFacultadSeleccionada({
        idFacultad: response.data[0].idFacultad,
        nombre: response.data[0].nombre,
        descripcion: response.data[0].descripcion,
        foto: response.data[0].foto
      }
      );
      setSubtitulo("Modificar Facultad");
    }
  }

  const cargarEspecialidades=async()=>{
    if(id!=='0'){
      await axios.get(urlEspe+"ListEspecialidadesXFacultad?idFacultad="+parseInt(id))
      .then(response=>{
        setEspes(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }
  }


  const cargarFoto=async()=>{
    if(id!=='0'){
      await axios.get(url)
      .then(response=>{
        setEspes(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }
  }


  useEffect(()=>{
    cargarFacultad();
    cargarEspecialidades();
    cargarFoto();
    },[],[])


  return (
    <div class="REGISTRAR-FACULTAD-CONTAINER">
        <div class="row">
            <p class="GESTION-GENERAL-TEXT">Gestión General</p>
            <p class="REGISTRAR-FACULTAD-TEXT">Registro de Facultad - {subTitulo}</p>
        </div> 
            <div class="row DATOS-FACULTAD">
                <div class="col-7" >
                    <div class="text-start fs-5 fw-normal  mb-1"><p>Nombre de la facultad</p></div>
                    <div class="input-group mb-3 ">
                        <input type="text"  class="form-control" name="nombre" placeholder="Facultad" 
                          onChange={handleChange} value={facultadSeleccionada && facultadSeleccionada.nombre } />
                       
                    </div>
                </div>


            </div>

            <div class = "row DATOS-FACULTAD">
                <div class = "col-12">
                    <div class="text-start fs-5 fw-normal "><p>Descripción</p></div>
                    <div class="input-group input-group-lg mb-3">
                        <input type="text"  class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                          onChange={handleChange} value={facultadSeleccionada && facultadSeleccionada.descripcion}  />
                    
                    </div>
                </div>
            </div>



    
            <div class = "row DATOS-FACULTAD">
                <div class = "col-12">
    <div class="text-start fs-5 fw-normal "><p>Foto</p></div>
                   
                    <img src={`data:image/jpeg;base64,${facultadSeleccionada.foto}`} alt="..." height="200px"/> 
                    <div class="input-group input-group-lg mb-3">
                    <input type="file"  name="foto" id="foto"  multiple className="form-control rounded-0 border border-secondary" 
                             onChange={(e)=>convertirBase64(e.target.files)}  />    
                 
                    </div>                  
                </div>
            </div>

 <div class = "row   ">
        <div class=" col-8  ">
          <table className='table-responsive fs-6'>
            <thead class ="bg-primary text-white">
              <tr class>

                  <th width="150px">Nombre</th>

              </tr>
            </thead >
            <tbody class="text-decoration-overline">
            <u>
            {espes.map(especialidad => (
                <tr key={especialidad.idEspecialidad}>
                    <td>{especialidad.nombre}</td>
                </tr>
              ))}
              </u>
            </tbody>
          </table>
        </div>
      </div>

            <div class="row INSERTAR-FACULTAD-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold  CANCELAR " type="button" onClick={()=>{navigate("../gestion/gesFacultad")}}><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                </div>
            </div>
    </div>
  )
}

/*
               <input type="text"  class="form-control" name="foto" placeholder="Foto" aria-label="foto" aria-describedby="inputGroup-sizing-lg" 
                          onChange={handleChange} value={facultadSeleccionada && facultadSeleccionada.foto}/>    
onChange={(e)=>convertirBase64(e.target.files)}  
*/
export default DatosFacultad
