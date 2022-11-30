import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import '../../stylesheets/General.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';

const urlSem= "http://34.195.33.246/api/Semestre/";
const urlFac= "http://34.195.33.246/api/Facultad/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
const urlCur= "http://34.195.33.246/api/Curso/";

function GestionarCurso()  {
    let navigate = useNavigate();
    const [currentPage,SetCurrentPage] = useState(0);
    const [data, setData]=useState([]);
    const [selFac, setSelFac] = useState(0);
    const [selSem, setSelSem] = useState(0);
    const [selEsp, setSelEsp] = useState(0);
    const [selFac1, setSelFac1] = useState(0);
    const [search, setSearch] = useState("");
    const [sem, setSem] = useState([]);
    const [facus, setFacus] = useState([]);
    const [esp, setEsp] = useState([]);
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

    let filtrado =[];
    let especialidades = !selFac? esp:esp.filter((dato)=>dato.facultad.idFacultad===selFac);
    const buscador = e=>{
        setSearch(e.target.value);
    }

    if(!search && !selFac && !selSem && !selEsp){//sin filtro
      filtrado=data;
      console.log(data)
    }
    else{
      if(search && selFac && selSem && selEsp){//ambos filtros
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
        filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) ;
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
      }
      else{
        if(search && selFac && selSem){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
          filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
        }
        else if(search && selFac && selEsp){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ; 
        }
        else if(search && selSem && selEsp){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ; 
        }
        else if(selFac && selSem && selEsp){
          filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
          filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) ;
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
        }
        else{
          if(search && selFac){
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
            filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
          }
          else if(search && selSem){
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
            filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
          }
          else if(search && selEsp){
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
            filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
          }
          else if(selFac && selSem){
            filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
            filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
          }
          else if(selFac && selEsp){
            filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
            filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
          }
          else if(selSem && selEsp){
            filtrado=data.filter((dato)=>dato.idSemestre===selSem)
            filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ; 
          }
          else {
            if(selFac)//filtro por facultad
              filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
            if(selSem)//filtro por facultad
              filtrado=data.filter((dato)=>dato.idSemestre===selSem) ;
            if(selEsp)//filtro por facultad
              filtrado=data.filter((dato)=>dato.idEspecialidad===selEsp) ;
            if(search)//filtro por nombre
              filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          }
        }
      }
    }


    const cambioSelectFacus =e=>{
        const valor = parseInt(e.target.value)
        setSelFac(valor)
      }

    const cambioSelectSemm =e=>{
        const valor = parseInt(e.target.value)
        setSelSem(valor)
      }
    const cambioSelectEspp =e=>{
        const valor = parseInt(e.target.value)
        setSelEsp(valor)
      }
  
    const nextPage = () =>{
          if(filtrado.length>=currentPage) //VER CODIGO
          SetCurrentPage(currentPage+5);
      }
    const previousPage =() =>{
          if(currentPage>0)
          SetCurrentPage(currentPage-5);
      }
  
    const seleccionarCurso=(curso)=>{
          setCursoSeleccionado(curso);
          openDeleteModal();
      }

    filtrado = filtrado.slice(currentPage,currentPage+5);

    const [cursoSeleccionado, setCursoSeleccionado]=useState({
        idCurso: 0,
        nombre: '',
        cant_alumnos: 0,
        cant_temas_prop: 0,
        activo: 0,
        idSemestre: 0,
        idDocente: 0,
        idFacultad: 0,
        idEspecialidad: 0,
        asesorPropone: false,
        alumnoPropone: false,
        temaAsignado: false
    })
    var arregloIDs =[];
    const petitionSem=async()=>{
        await axios.get(urlSem+"GetSemestres/")
        .then(response=>{
        setSem(response.data);
        }).catch(error =>{
        console.log(error.message);
        })
    }

    const petitionFacu=async()=>{
        await axios.get(urlFac+"GetFacultades/")
        .then(response=>{
          setFacus(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
      }
    
      const petitionEsp=async()=>{
        await axios.get(urlEsp+"GetEspecialidades/")
        .then(response=>{
          setEsp(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
      }
    
    const petitionCurso=async()=>{
        let idUs = window.localStorage.getItem("IDUSUARIO");
        await axios.get(urlCur+"ListarCursosXIdComiteTesis?idComiteTesis="+idUs)
        .then(response=>{
          console.log(response.data);
          setData(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
      }
    
      const peticionDelete=async()=>{
        await axios.delete(urlCur+ "DeleteCurso?idCurso="+ cursoSeleccionado.idCurso).then(response=>{
          petitionCurso();
          closeDeleteModal();
          openConfirmModal();
        })
      }

    const cambioSelectSem =e=>{
        setCursoSeleccionado(prevState=>({
        ...prevState,
        idSemestre: e.target.value
        }))
        console.log(cursoSeleccionado);
      }
    const cambioSelectFac =e=>{
        setCursoSeleccionado(prevState=>({
        ...prevState,
        idFacultad: e.target.value
        }))
        console.log(cursoSeleccionado); 
    }
    const cambioSelectEsp =e=>{
        setCursoSeleccionado(prevState=>({
        ...prevState,
          idEspecialidad: e.target.value
        }))
        console.log(cursoSeleccionado);
        
    }
    
    useEffect(()=>{
        let tipoUsuario = window.localStorage.getItem("TIPOUSUARIO");
        petitionSem();
        petitionFacu();
        petitionEsp();
        //petitionCurso()               //
        if(tipoUsuario=="DOCENTE"){
          petitionCursoDocente()
        }
        else if(tipoUsuario=="COMITE"){
          petitionCursoComite()
        }
        else if(tipoUsuario=="ASESOR"){
          petitionCursoAsesor();
        }
        else if(tipoUsuario=="ALUMNO"){
          petitionCursoAlumno();
        }
    },[])
    const petitionCursoDocente= async()=>{
      let idUs = window.localStorage.getItem("IDUSUARIO");
        await axios.get("http://34.195.33.246/api/Curso/ListarCursosXIdDocente?idDocente="+idUs)
        .then(response=>{
          console.log("CURSOS DE DOCENTE");
          console.log(response.data);
          setData(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
    };
    const petitionCursoComite = async()=>{
      let idUs = window.localStorage.getItem("IDUSUARIO");
        await axios.get("http://34.195.33.246/api/Curso/ListarCursosXIdComiteTesis?idComiteTesis="+idUs)
        .then(response=>{
          console.log(response.data);
          setData(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
    }
    const petitionCursoAsesor = async()=>{
      let idUs = window.localStorage.getItem("IDUSUARIO");
        await axios.get("http://34.195.33.246/api/Curso/ListarCursosXIdAsesor?idAsesor="+idUs)
        .then(response=>{
          console.log(response.data);
          setData(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
    }
    const petitionCursoAlumno= async()=>{
      let idUs = window.localStorage.getItem("IDUSUARIO");
        await axios.get("http://34.195.33.246/api/Curso/ListarCursosXIdAlumno?idAlumno="+idUs)
        .then(response=>{
          console.log(response.data);
          setData(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
    }
    function seleccionarFila() {
      const rows=document.querySelectorAll('tr');
      for(var i=1;i<rows.length;i++){
        //Tomar cada celda
          var cell1 = rows[i].cells[0];
          var cell2 = rows[i].cells[1];
          arregloIDs.push(cell1.textContent);
          console.log(arregloIDs);
          rows[i].onclick= function(){
            console.log(this.rowIndex);
            console.log(arregloIDs[this.rowIndex-1]);
            console.log("me hicieron click");
            localStorage.setItem("idCurso",arregloIDs[this.rowIndex-1]);
            
            if(localStorage.getItem("TIPOUSUARIO")=="ALUMNO")navigate('/alumno');
            if(localStorage.getItem("TIPOUSUARIO")=="ASESOR")navigate('/asesor');
            if(localStorage.getItem("TIPOUSUARIO")=="DOCENTE")navigate('/profesor');
            if(localStorage.getItem("TIPOUSUARIO")=="COMITE")navigate('/comite');
          }  

          rows[i].onclick=function(){
            console.log(arregloIDs[this.rowIndex-1]);
            localStorage.setItem("idCurso",arregloIDs[this.rowIndex-1]);
            if(localStorage.getItem("TIPOUSUARIO")=="ALUMNO")navigate('/alumno');
            if(localStorage.getItem("TIPOUSUARIO")=="ASESOR")navigate('/asesor');
            if(localStorage.getItem("TIPOUSUARIO")=="DOCENTE")navigate('/profesor');
            if(localStorage.getItem("TIPOUSUARIO")=="COMITE")navigate('/comite');
          }  
      }
     }
  seleccionarFila();
    return(
        <div className="CONTAINERCOMITE">
            <h1 >Mis Cursos</h1>
            <div class="row">
              <div class="col-7 " >
                  <p>Ingrese el nombre del curso</p>
                  <input size="10" type="search" value={search} class="form-control icon-search" name="search" placeholder="Nombre del curso" aria-label="serach" onChange={buscador}/>
              </div>
              <div class="col-3 " >
                  <p>Seleccione Semestre</p>
                  <select select class="form-select " aria-label="Default select example" onChange= {cambioSelectSemm}>
                      <option selected value = "0">Todos</option>
                      {sem.map(elemento=>(
                        <option key={elemento.idSemestre} value={elemento.idSemestre}>{elemento.anho + '-' + elemento.numSemestre}</option>  
                      ))} 
                  </select>
                </div>
            </div>
            <div class="row">
              <div class="col-5 " >
                  <p>Seleccione facultad</p>
                  <select select class="form-select " aria-label="Default select example" onChange= {cambioSelectFacus}>
                      <option selected value = "0">Todos</option>
                      {facus.map(elemento=>(
                        <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
                      ))} 
                  </select>
              </div>
              <div class="col-5" >
                  <p>Seleccione especialidad</p>
                  <select select class="form-select " aria-label="Default select example" onChange= {cambioSelectEspp}>
                      <option selected value = "0">Todos</option>
                      {especialidades.map(elemento=>(
                        <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                      ))} 
                  </select>
                </div>
            </div>

          <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
          <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
          <div class = "row LISTAR-TABLA" id="LISTAR-TABLA">
            <div class=" col-12 ">
              <table className='table fs-6 TABLALISTARCURSOS' >
                <thead class >
                  <tr class>
                      <th style = {{width:10}}>Id</th>
                      <th style ={{width: 275}}>Nombre</th>
                  </tr>
                </thead>
                <tbody >
                  {filtrado.map(curso => (
                    <tr key={curso.idCurso} style={{cursor:"pointer" }}>
                        <td>{curso.idCurso}</td>
                        <td >{curso.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
}
export default GestionarCurso;