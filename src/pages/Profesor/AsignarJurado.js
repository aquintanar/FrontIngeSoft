import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import { useStateManager } from 'react-select';
/*
const urlAs= "http://34.195.33.246/api/Asesor/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
const urlAsXCurso="http://34.195.33.246/api/AsesorXCurso/";
*/
const urlAs= "https://localhost:7012/api/Asesor/";
const urlDoc= "https://localhost:7012/api/Docente/";
const urlAl= "https://localhost:7012/api/Alumno/";
const urljurado="https://localhost:7012/api/Jurado/";
const urlJuradoxAlumno="https://localhost:7012/api/JuradoXAlumno/";

let idEs=0;

function AsignarJurado()  {
  let navigate = useNavigate();
  let {id} = useParams();
  let esp=0;
  const [currentPage,SetCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [jur, setJur] = useState([]);
  const [doc, setDoc] = useState([]);
  const [isOpenRegistro, openRegistroModal ,closeRegistroModal ] = useModal();
  const [isOpenRegistroConf, openRegistroConfModal ,closeRegistroConfModal ] = useModal();
  const [asesorSeleccionado,setAsesorSeleccionado] = useState([]);
  const [jurado,SetJurado] = useState({
    idUsuario: 0,
    idJurado: 0
  })
  const [jurados,setJurados] = useState([]);

  const [alumno,SetAlumno]= useState([]);

  let filtrado =[];
  const buscador = e=>{
      setSearch(e.target.value);
  }
  if(!search ){//sin filtro
    filtrado=as.concat(jur);
    jurados.forEach((jura)=>{
      for(let index in filtrado){
        if(filtrado[index].idUsuario===jura.idUsuario){
          filtrado.splice(index,1);
        }
      }
    })
    
    filtrado=filtrado.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
  }
  else{
        if(search){//filtro por nombre
          filtrado=as.concat(jur);
          jurados.forEach((jura)=>{
            for(let index in filtrado){
              if(filtrado[index].idUsuario===jura.idUsuario){
                filtrado.splice(index,1);
              }
            }
          })
          filtrado=filtrado.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
        }
  }
 
  const nextPage = () =>{
        if(filtrado.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
  const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

  const seleccionarAsesor=(asesor)=>{
    jurado.idUsuario=asesor.idUsuario
    setAsesorSeleccionado(asesor);
    openRegistroModal();
  }

  const peticionPostJurado=async()=>{
      await axios.post(urlJuradoxAlumno+"PostJuradoXAlumno?idJurado="+jurado.idJurado+"&idAlumno="+parseInt(id)+"&idCurso="+localStorage.getItem('idCurso'))
      .then(response=>{
        closeRegistroModal();
        openRegistroConfModal();
      }).catch(error =>{
        console.log(error.message);
      })
  }

  const peticionPost=async()=>{
      await axios.put(urljurado+"AsignarComoJurado/",jurado)
      .then(response=>{
        jurado.idJurado = response.data.idJurado;
        peticionPostJurado();
      }).catch(error =>{
        console.log(error.message);
      })
  }
  

  filtrado = filtrado.slice(currentPage,currentPage+5);


  const petitionAs=async()=>{
      await axios.get(urlAs+"ListAsesoresXIdEspecialidadQueNoSonJurados?idEspecialidad="+ esp)
      .then(response=>{
      setAs(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }

  const petitionDoc=async()=>{
      await axios.get(urlDoc+"ListDocentesXIdEspecialidadQueNoSonJurados?idEspecialidad="+ esp)
      .then(response=>{
       setDoc(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }

  const petitionJurad=async()=>{
      await axios.get(urljurado+"ListarJuradosXEspecialidad?idEspecialidad="+ esp)
      .then(response=>{
        setJur(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }


  const cargarAlumno=async()=>{
    if(id!=='0'){
      await axios.get(urlAl+"GetAlumnoXId?idAlumno="+parseInt(id))
      .then(response =>{
        esp = response.data[0].idEspecialidad;
        SetAlumno(response.data[0]);
        petitionAs();
        petitionDoc();
        petitionJurad();
      })
      .catch(error =>{
        console.log(error.message);
      })
    }
}
  const cargarJurados=async()=>{
    console.log(idEs);
    await axios.get(urljurado+"ListarJuradosXAlumno?idAlumno="+parseInt(id))
    .then(response=>{
      setJurados(response.data);
    }).catch(error =>{
    console.log(error.message);
    })
  }
  
  useEffect(()=>{
    cargarAlumno();
    cargarJurados();
  },[])

  return(
      <div className="CONTAINERCOMITE">
          <p className="HEADER-TEXT1">Asignar jurados <p className="HEADER-TEXT2 mt-3 ms-5">{"("+alumno.nombres + " " +alumno.apePat + ")"} </p></p>
          <p class="HEADER-TEXT2">Búsqueda de jurados </p>
          <div class="row">
            <div class="col FILTRO-LISTAR-BUSCAR" >
                <p>Ingrese el nombre del jurado</p>
                <div class="input-group">
                    <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Nombre del jurado" aria-label="serach" onChange={buscador}/>
                </div>
            </div>
          </div>

        <p class="HEADER-TEXT2 mt-5" >Lista de jurados</p>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <div class = "row LISTAR-TABLE">
          <div class=" col-12 ">
            <table className='table fs-6 '>
              <thead class >
                <tr class>
                    <th style ={{width: 275}}>Nombre</th>
                    <th style ={{width: 150}}>Correo</th>
                    <th style = {{width:100}}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {filtrado.map(asesor => (
                  <tr key={asesor.idUsuario}>
                      <td >{asesor.nombres + " " + asesor.apePat+ " " + asesor.apeMat}</td>
                      <td >{asesor.correo}</td>
                      <td>
                      <div class="LISTAR-TABLE-BOTON"> 
                      <button class=" btn btn-primary fw-bold" onClick={()=>seleccionarAsesor(asesor)}> <span>Seleccionar</span></button>
                      </div>                      
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


    <ModalPregunta
            isOpen={isOpenRegistro} 
            closeModal={closeRegistroModal}
            procedimiento = "asignar al"
            objeto="jurado"
            elemento={asesorSeleccionado && asesorSeleccionado.nombres}
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button class="btn btn-danger btn-lg"  onClick={closeRegistroModal}>Cancelar</Button>
            </div>
    </ModalPregunta>

    <ModalConfirmación
      isOpen={isOpenRegistroConf} 
      closeModal={closeRegistroConfModal}
      procedimiento= "asignado"
    >
      <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
        <Button class="btn btn-success btn-lg" onClick={()=>{navigate(-1)}}>Entendido</Button>
      </div>
    </ModalConfirmación>

            <div class="row INSERTAR-BOTONES">                            
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate(-1)}}><span>Cancelar</span></button>
              </div>
          </div>
          
      </div>
  )
}
export default AsignarJurado;