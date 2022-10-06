import axios from 'axios' ; 
import "bootstrap/dist/css/bootstrap.min.css";
import '../../Pagina.css'
import { BrowserRouter as Router, Route,Routes, Link, Navigate, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {  Modal, Button} from '@material-ui/core';
import {makeStyles, createTheme} from '@material-ui/core/styles';

const urlArea = "https://localhost:7012/api/Area/";
const urlTesis = "https://localhost:7012/api/TemaTesis/";

const themeX = createTheme({
    palette: {
      type: "dark",
      grey: {
        800: "#000000", // overrides failed
        900: "#121212" // overrides success
      },
      background: {
        paper: "#1294F2"
      }
    }
  });
  
  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: themeX.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 5),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));
  
export const TemaSeleccionado = () => {

    const styles = useStyles();
    const [areas , setAreas] = useState([]);
    const [modalPublicar , setModalPublicar] = useState(false) ; 
    const [data , setData] = useState([]);
    const [dataProponer , setDataProponer] = useState([]);
    const [temasPro , setTemasProp ] = useState([]);
    const [search , setSearch] = useState("");
    const [searchNomb , setSearchNomb] = useState("");
    const [fil , setFil] = useState(0);

     const showData = async() => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setData(data)
     }
    let navigate = useNavigate();
    

    const searcher = e => {
        setSearch(e.target.value) ; 
    }

    const searcherNombre = e => {
        setSearchNomb(e.target.value);
        console.log(e.target.value)
    }

    let results = [] ;
    
    if(!search && !searchNomb){//sin filtro
        results=dataProponer;
    }
    else{
        if (search && searchNomb){
            results=dataProponer.filter((dato)=>dato.tituloTesis.toLowerCase().includes(search.toLocaleLowerCase())) ; 
        }
        if(search)
            results = dataProponer.filter((dato)=>dato.tituloTesis.toLowerCase().includes(search.toLocaleLowerCase())) ; 
        if(searchNomb)
            results = dataProponer.filter((dato)=>dato.nombresAlumno.toLowerCase().includes(search.toLocaleLowerCase())) ; 
          
    }
    const publicarTemas = (temasPropuestos)=>{
        
        abrirCerrarModalPublicar() ; 
    }
    const peticionGet = async()=>{
        await axios.get(urlTesis+"GetTemaTesis")
        .then(response => {
            let i = 0  ; 
            let index = 0 ; 
            for (i = 0 ; i < response.data.length ; i++){
                if (response.data[i].estadoTema != "Publicado"){
                    dataProponer[index] = response.data[i];
                    index = index + 1 ; 
                }      
            }
            setTemasProp(dataProponer);
        }).catch(error => {
            console.log(error.message);
        })
    }

    const petitionArea = async()=>{
        await axios.get(urlArea + "GetAreas")
        .then(response => {
            setAreas(response.data);
        }).catch(error => {
            console.log(error.message);
        })
    }

    const abrirCerrarModalPublicar=()=>{
        setModalPublicar(!modalPublicar);
    }
    const peticionPublicar = async()=>{
        let i = 0
        let tamanoTemasPro = temasPro.length
        for ( i = 0 ; i < tamanoTemasPro ; i++){
            if(temasPro[i].estadoTema === "Aprobado"){
                await axios.put(urlTesis+"PublicarTemaTesis?idTemaTesis="+temasPro[i].idTemaTesis)
                .then(response=>{
                console.log("modificadoooo");
                }).catch(error =>{
                console.log(error.message);
                })
            }
            
        }
        abrirCerrarModalPublicar();
        //await axios.put(urlTesis+"ModifyTemaTesis" , data)
    }
    useEffect(()=>{
        peticionGet();
        petitionArea();
    })

    //Mensaje de confirmacion para publicar 
    const bodyPublicar = (
        <div className={styles.modal} >
            <div align = "center">
                <p class= "text-white">¿Estás seguro que deseas publicar la lista? Solo se publicaran los temas con estado <b>Aceptado</b></p>
            </div>
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success" onClick = {()=>peticionPublicar(data)}>Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger" onClick={()=>abrirCerrarModalPublicar()}>Cancelar</Button>
            </div>
        </div>
    )


    return (
        
        <div class="row g-3 container LISTAR-ESPECIALIDADES-CONTAINER">
            <p class="GESTION-GENERAL-TEXT">Gestión General</p>
            <p class=" BUSQUEDA-ESPECIALIDAD-TEXT">Temas</p>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Ingresar nombre del tema</label>
                <input value = {search} onChange = {searcher}  type="text" class="form-control" placeholder="Titulo de la tesis"/>
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Ingresar nombre del asesor o alumno</label>
                <input value = {searchNomb} onChange = {searcherNombre} type="email" class="form-control" placeholder="Nombre del asesor o alumno" id="inputEmail4"/>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Area</label>
                <select class="form-select" id="inputPassword4" >
                    <option selected value = "0">Escoger el area</option>
                    {areas.map(elemento=>(
                        <option key = {elemento.idArea} value = {elemento.idArea}>{elemento.nombre}</option>
                    ))}
                </select>
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Ordenar por</label>
                <select class="form-select" id="" >
                    <option selected >Registrados recientemente</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div>


            <p class="text-start  fs-4 mt-3 fw-bold" >Lista de Propuestas</p>
            <div class = "row">
            <div class=" col">
                <table className='table fs-6'>
                <thead class >
                    <tr class>
                        <th>Titulo</th>
                        <th>Proponente</th>
                        <th>Estado</th>
                        <th>Ultima modificacion</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(tesis => (
                        <tr keY = {tesis.idTemaTesis}>
                            <td>{tesis.tituloTesis}</td>
                            <td>
                            {(() => {
                                        if(tesis.idAsesor === tesis.idProponente){
                                            return <td>{tesis.nombresAsesor + " " + tesis.apePatAsesor}</td>;
                                        }
                                        else {
                                            return <td>{tesis.nombresAsesor + " " + tesis.apePatAsesor}</td>;
                                        }
                            }) ()}
                            </td> 
                            <td>{tesis.estadoTema}</td> 
                            <td>{tesis.fechaModificacion}</td> 
                            <td>
                            {(() => {
                                        if(tesis.idAsesor === tesis.idProponente){
                                            return <td>Asesor</td>;
                                        }
                                        else {
                                            return <td>Alumno</td>;
                                        }
                            }) ()}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
            </div>
            </div>
            
            <Modal
            open = {modalPublicar}
            onClose={abrirCerrarModalPublicar}>
                {bodyPublicar}
            </Modal>
            

            <div className='LISTAR-ESPECIALIDADES-BOTON'>
                <button className='btn btn-primary fs-4 fw-bold mb-3'  onClick={()=>publicarTemas(temasPro)}>Publicar</button>
            </div>  
        </div>
  
    );

};
