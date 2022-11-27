import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../stylesheets/Administrador.css';
import "../../stylesheets/General.css";
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';

const url2= "https://localhost:7012/api/DetalleRubrica/";
const url1= "https://localhost:7012/api/Entregable/";
//const url2= "http://44.210.195.91/api/DetalleRubrica/";
//const url1= "https://44.210.195.91/api/Entregable/";

function DatosRubrica({entregable, setEntregable, rubricas, SetRubricas,id,rubs,idRub})  {

    let navigate = useNavigate();
    const [currentPage,SetCurrentPage] = useState(0);
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [edit, SetEdit] = useState(0);
    let confirm = 0;
    let long = 0;
    let borrar = [];
    let nuevo = [];
    let filtrado=[];

    filtrado = rubricas;

    const [rubricaSeleccionada, setRubricaSeleccionada]=useState({
        rubro: '',
        nivelDeseado: '',
        puntajeMaximo: 0,
        fidRubrica: 0
    })  

    filtrado = filtrado.slice(currentPage,currentPage+5);

    const handleChange=e=>{
        const {name, value}=e.target;
        setRubricaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }))
    }
    

    const nextPage = () =>{
        if(rubricas.length>=5) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    const agregaDatos=()=>{
        rubricas.push(rubricaSeleccionada);
        setRubricaSeleccionada({
            rubro: '',
            nivelDeseado: '',
            puntajeMaximo: 0,
            fidRubrica: 0
        })
    }

    const quitaRubro=(elemento)=>{
        var index = rubricas.indexOf(elemento);
        rubricas.splice(index,1);
        SetEdit(!edit);
    }

    const peticionPost=async(element)=>{
        await axios.post(url2+"PostDetalleRubrica",element,{
            _method: 'POST'
          })
        .then(response=>{
            confirm = confirm+1;
            if(long===confirm){
                if(id==='0'){
                    closePostModal();
                    openGuardadoModal();
                }
                  else{
                    closeEditModal();
                    openEditadoModal(); 
                }
            }
        }).catch(error =>{
            console.log(error.message);
        })
    }
    
    const verificaTipo =()=>{
        if(entregable.responsableSubir ===0 ){
            entregable.fechaEntregaAsesor = new Date();
            entregable.responsableSubir = 1;
            peticionPostEntregable2();
        }
        else{
            peticionPostEntregable();
        }
    }

    const peticionPostEntregable=async()=>{
        await axios.post(url1+"PostEntregableConRubrica?linkDoc=jjjj",entregable,{
            _method: 'POST'
          })
        .then(response=>{
            entregable.idEntregable = response.data.idRubrica;
            guarda();
        }).catch(error =>{
            console.log(error.message);
        })  
    }

    const peticionSelecter =()=>{
        if(id==='0'){
          openPostModal();
        }
        else{
          openEditModal();  
        }
    }

    const peticionPutEntregable=async()=>{
        await axios.put(url1+"PutEntregable",entregable)
        .then(response=>{
            editaRubricas();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const peticionPutEntregable2=async()=>{
        await axios.put(url1+"PutEntregableMarcel",entregable)
        .then(response=>{
            editaRubricas();
        }).catch(error =>{
            console.log(error.message);
        })
    }
    
    const verificaTipo2 =()=>{
        if(entregable.responsableSubir ===0 ){
            entregable.fechaEntregaAsesor = new Date();
            entregable.responsableSubir = 1;
            peticionPutEntregable2();
        }
        else{
            peticionPutEntregable();
        }
    }

    const compara =(obj1,obj2)=>{
        if(obj1.rubro===obj2.rubro && 
            obj1.nivelDeseado===obj2.nivelDeseado 
            && obj1.puntajeMaximo === obj2.puntajeMaximo ){
                return 1;
        }
        else{
            return 0;
        }
    }

    const editaRubricas =()=>{
        for (let i = 0; i < rubricas.length; i++) {
            if(rubs.length===0){
                nuevo.push(rubricas[i]);
            }
            for (let j = 0; j < rubs.length; j++) {
                if(compara(rubs[j],rubricas[i])){
                    break;
                }
                if(j===(rubs.length-1)){
                    nuevo.push(rubricas[i]);
                }
            }
        }
        for (let i = 0; i < rubs.length; i++) {
            if(rubricas.length===0){
                borrar.push(rubs[i]);
            }
            for (let j = 0; j < rubricas.length; j++) {
                if(compara(rubs[i],rubricas[j])){
                    break;
                }
                if(j===(rubricas.length-1)){
                    borrar.push(rubs[i]);
                }
            }
        }
        guardaRubrica();
    }
    
    const guardaRubrica=()=>{
        borrar.forEach(async element => {
            await peticionDeleteRubs(element.idDetalleRubrica);
        });
        long = nuevo.length;
        nuevo.forEach(async element => {
            element.fidRubrica = idRub;
            await peticionPost(element);
        });
        if(long===0){//no se agrega nada
            closeEditModal();
            openEditadoModal(); 
        }
    }

    const peticionDeleteRubs=async(element)=>{
        await axios.delete(url2+ "DeleteDetalleRubrica?idDetalleRubrica="+element)
        .then(response=>{
            console.log("eliminando " + {element});
      })
    }

    const peticionPostEntregable2=async()=>{
        await axios.post(url1+"PostEntregableConRubricaMarcel?linkDoc=jjjj",entregable,{
            _method: 'POST'
          })
        .then(response=>{
            entregable.idEntregable = response.data.idRubrica;
            guarda();
        }).catch(error =>{
            console.log(error.message);
        })  
    }


    const guarda=()=>{
        long = rubricas.length;
        if(long===0){
            closePostModal();
            openGuardadoModal();
        }
        else{
            rubricas.forEach(async element => {
                element.fidRubrica = entregable.idEntregable;
                await peticionPost(element);
            });
        }
    }

    const terminar=()=>{
        closeGuardadoModal();
        navigate("../preparacion/entregables");
    }

    const cargaRub =(elemento)=>{
        setRubricaSeleccionada({
            rubro: elemento.rubro,
            nivelDeseado: elemento.nivelDeseado,
            puntajeMaximo: elemento.puntajeMaximo,
            fidRubrica: elemento.fidRubrica,
        })
        var index = rubricas.indexOf(elemento);
        rubricas.splice(index,1);
    }

    return (      
        <div class ="CONTAINERADMIN " >   
    
        <h1>Datos Rúbrica</h1>


        <div class=" row" >
            <div class="col-3">
                <p>Entrega o Presentación</p>
            </div>
            <div class="col">
                <div class="input-group">
                    <input type="text" disabled class="form-control" name="entregable" placeholder="Entrega o presentación" value={entregable.nombre}/>
                </div>
            </div>
        </div>

        <div class=" row" >
            <div class="col-3">
                <p>Rubro</p>
            </div>
            <div class="col">
                <div class="input-group">
                    <input type="text"  class="form-control" name="rubro" placeholder="Rubro" 
                          onChange={handleChange} value={rubricaSeleccionada && rubricaSeleccionada.rubro} />
                </div>
            </div>
        </div>

        <div class=" row" >
            <div class="col-3">
                <p>Nivel Deseado</p>
            </div>
            <div class="col">
                <div class="input-group ">
                        <textarea class="form-control" name="nivelDeseado" placeholder="Descripción"
                          onChange={handleChange} value={rubricaSeleccionada && rubricaSeleccionada.nivelDeseado} />
                </div>
            </div>
        </div>

        <div class=" row" >
            <div class="col-3">
                <p>Puntaje Máximo</p>
            </div>
            <div class="col-3">
                <div class="input-group ">
                    <input type="number"  class="form-control" name="puntajeMaximo" placeholder="Puntaje"  
                          onChange={handleChange} value={rubricaSeleccionada && rubricaSeleccionada.puntajeMaximo} />
                </div>
            </div>
        </div>

        <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button title='Añadir rúbrica' class="btn btn-primary fs-4 fw-bold   AÑADIR" type="button" onClick={()=>agregaDatos()}><span>Añadir</span></button>
                </div>
        </div>   
  
          <h2>Rúbrica</h2>
          <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
          <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
          <div class = "row LISTAR-TABLA-EV mb-1">
            <div class=" col-12">
              <table className='table fs-6 '>
                <thead class >
                  <tr class>
                      <th style ={{width: 120}}>Rubro</th>
                      <th style = {{width:300}} >Nivel Deseado</th>
                      <th style = {{width:90}} >Puntaje Máximo</th>
                      <th style = {{width:40}} >Acciones</th>
                  </tr>
                </thead>
                <tbody >
                  {filtrado.map(elemento => (
                    <tr key={elemento.rubro}>
                        <td >{elemento.rubro}</td>    
                        <td >{elemento.nivelDeseado}</td>    
                        <td>{elemento.puntajeMaximo}</td>    
                        <td>
                        <button title='Modificar rúbrica' class="btn BTN-ACCIONES" onClick={()=>cargaRub(elemento)}> <FaIcons.FaEdit /></button>
                        <button title='Eliminar rúbrica' class=" btn BTN-ACCIONES" onClick={()=>quitaRubro(elemento)}> <BootIcons.BsTrash /></button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto={entregable.fidTipoEntregable===4? "la exposición":"la entrega" }
              elemento={entregable && entregable.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={verificaTipo2} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>             

          <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={terminar}>Entendido</Button>
              </div>
            </ModalConfirmación>

          <ModalPregunta
              isOpen={isOpenPostModal} 
              closeModal={closePostModal}
              procedimiento = "guardar"
              objeto={entregable.fidTipoEntregable===4? "la presentación":"la entrega" }
              elemento={entregable && entregable.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={verificaTipo} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={terminar}>Entendido</Button>
              </div>
            </ModalConfirmación>
          
            <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button title='Guardar entrega o presentación' class="btn btn-primary fs-4 fw-bold GUARDAR" type="button"  onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                    <button title="Cancelar" class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button"  onClick={()=>{navigate("../preparacion/entregables")}}><span>Cancelar</span></button>
                </div>
            </div>           
        </div>              
    )
}
export default DatosRubrica;