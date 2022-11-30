import React ,{useState , useEffect} from "react";
import './proponerTemaAsesor.css';
import axios from "axios";

import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";

const urlSolicitud = "http://34.195.33.246/api/SolicitudTemaXAlumno/"
const SolicitudesTema = () =>{
    let filtrado = []
    const [currentPage,SetCurrentPage] = useState(0);
    const [solicitudes , SetSolicitudes] = useState([]);
    const nextPage = () =>{
        //if(filtrado.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        //if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }
    const listarSolicitudes = async()=>{
        await axios.get(urlSolicitud+"ListSolicitudesTemaXAsesor?idAsesor="+ localStorage.getItem("IDUSUARIO"))// 
        .then(response=>{
            SetSolicitudes(response.data);
        }).catch(error =>{
        console.log(error.message);
        })
    }
    filtrado = filtrado.slice(currentPage,currentPage+5);
    const aceptarSolicitud=async (id , idAlumno , idTemaTesis , idAs)=>{
        let urlAceptar  = "http://34.195.33.246/api/SolicitudTemaXAlumno/AceptarSolicitud?idSolicitud="+id
        await axios.put(urlAceptar,
          {
          _method: 'PUT'
          })
        .then(response=>{
          //closePostModal();
          //openGuardadoModal();
        }).catch(error =>{
          console.log(error.message);
        })
        console.log(idAlumno)
        let urlActualizar = "http://34.195.33.246/api/TemaTesis/AsignarTemaTesisUno?idTemaTesis="+idTemaTesis+"&idAlumno="+idAlumno+"&idAsesor="+idAs
        await axios.put(urlActualizar,
            {
            _method: 'PUT'
            })
          .then(response=>{
            //closePostModal();
            //openGuardadoModal();
            window.confirm("Se ha Aceptado su solicitud");
            window.location.reload(false);
          }).catch(error =>{
            console.log(error.message);
          })

      }
      const rechazarSolicitud=async (id)=>{
        let urlRechazar  = "http://34.195.33.246/api/SolicitudTemaXAlumno/RechazarSolicitud?idSolicitud="+id
        console.log(urlRechazar)
        await axios.put(urlRechazar,
          {
          _method: 'PUT'
          })
        .then(response=>{
          //closePostModal();
          //openGuardadoModal();
          window.confirm("Se ha rechazado la solicitud");
          window.location.reload(false);
        }).catch(error =>{
          console.log(error.message);
        })
      }
      

    useEffect(()=>{
        console.log("SOLICITUDESs")
        listarSolicitudes();
        console.log(solicitudes)
     },[])

    filtrado = solicitudes
    return (
        <div class ="CONTAINERADMIN ">
        <p class="HEADER-TEXT1 mb-4">Solicitudes de tema</p>  
        <p class="HEADER-TEXT2 mt-5" >Lista de Solicitudes</p>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <div class = "row LISTAR-TABLA">
            <div class=" col-12 ">
            <table className='table fs-6 '>
                <thead class >
                <tr class>
                    <th style ={{width: 10}}>ID Tesis</th>
                    <th style = {{width:180}}>Nombre de la tesis</th>
                    <th style = {{width:180}}>Alumno solicitante </th>
                    <th style = {{width:10}}>Estado </th>
                    <th style = {{width:20}}>Acciones</th>
                </tr>
                </thead>
                <tbody >
                    {filtrado.map(sols=>(
                        <tr key={sols.idSolicitudTemaXAlumno}>
                        <td >{sols.idSolicitudTemaXAlumno}</td>                   
                        <td>{sols.tituloTesis}</td>
                        <td>{sols.nombreAlumno}</td>
                        <td>{sols.estadoTema}</td>
                        <td>
                        <button class="btn BTN-ACCIONES" onClick={()=>aceptarSolicitud(sols.idSolicitudTemaXAlumno, sols.fidAlumno , sols.idTemaTesis , sols.idAsesor)}> <BsIcons.BsCheckLg/></button>
                        <button  class=" btn BTN-ACCIONES" onClick={()=>rechazarSolicitud(sols.idSolicitudTemaXAlumno)}> <BsIcons.BsFillXCircleFill /></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        
    )
}
export default SolicitudesTema