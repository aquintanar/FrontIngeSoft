import React ,{useState , useEffect} from "react";
import {  useNavigate } from 'react-router-dom';
import './proponerTemaAsesor.css';
import * as FaIcons from 'react-icons/fa';
import axios from "axios";
import * as BsIcons from 'react-icons/bs';
import {ToastContainer,toast} from 'react-toastify';

const urlTemaTesis= "https://localhost:7012/api/TemaTesis/";
const urlCurso= "https://localhost:7012/api/Curso/";
const ListarTemasTesis = () =>{
    //setear los hooks useState
    let navigate = useNavigate();
    let idCursoGlobal = localStorage.getItem("idCurso");
    let idAsesor = localStorage.getItem("IDUSUARIO");
    const[Titles , setTitles] = useState([]);
    const[search , setSearch] = useState("");
    const[searchClav,  setSearchClav] = useState("");
    const[record , setRecord] = useState([]);
    const [currentPage,SetCurrentPage] = useState(0);
    const [aceptarTemas,setAceptarTemas] = useState(0);
    const[modelData , setModelData] = useState({
        id:"",
        titulo:"",
        estadoTema:""
    })
    const[temaTesis, setTemaTesis] = useState({
        idTemaTesis: 0,
        idProponente: parseInt(localStorage.getItem("IDUSUARIO")),
        tituloTesis:'',
        descripcion:'',
        palabraClave1:'',
        palabraClave2:'',
        motivoRechazo:'',
        area:{
            idArea:0,
            idEspecialidad:0,
            nombre:'',
        },
        fidCurso: parseInt(localStorage.getItem("idCurso")),
    })
    const verPeriodoRecepcion = async () => {
        let idcur = window.localStorage.getItem("idCurso");
        await axios
          .get("https://localhost:7012/api/Curso/BuscarCursoXId?idCurso=" + idcur)
          .then((response) => {
            console.log(response.data);
            if (response.data[0].aceptandoTemas == 0) {
                notify();
            } else {
                navigate("agregarTema/0");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
    
    const nextPage = () =>{
        if(results.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    //local
        //http://34.195.33.246/
        //EC2
        // http://44.210.195.91/

    const URL = "http://34.195.33.246/api/TemaTesis/GetTemaTesis";
    const notify = ()=>toast.error("El periodo de recepcion de propuestas ha culminado");
    const showData = async() => {
        const response = await fetch(urlTemaTesis + "ListTemaTesisXIdAsesorXIdCurso?idAsesor=" + idAsesor + "&idCurso="+ idCursoGlobal)
        const data = await response.json()
        console.log(data)
        setTitles(data)
    }
    //funcion de busqueda
    const searcher = (e) =>{
        setSearch(e.target.value) ; 
        console.log(e.target.value);
    }
    const searcherClav = (e) => {
        setSearchClav(e.target.value) ; 
        console.log(e.target.value)
    }

     // metodo de filtrado
    let results = []

    if(!search && !searchClav){
        results = Titles ; 
    }
    else {
        if (search){
            results = Titles.filter((dato) =>
            dato.tituloTesis.toLowerCase().includes(search.toLocaleLowerCase()))
        }
        else if (searchClav){
            results = Titles.filter((dato) =>
            dato.PalabraClave1.toLowerCase().includes(searchClav.toLocaleLowerCase()))

        }
    }

    results = results.slice(currentPage,currentPage+5);

    const cargarAceptando = async () => {
        const response = await axios.get(
            urlCurso + "BuscarCursoXId?idCurso=" + parseInt(idCursoGlobal)
        );
        setAceptarTemas(response.data[0].aceptandoTemas);
    };

    useEffect(()=>{
        console.log(Titles);
        cargarAceptando();
        showData();
    },[])
    
    return (        
        <div class = "CONTAINER-ASESOR">
            <div class = "row">    
                <h1>Tema de tesis</h1>
            </div>
            <h2>Buscar tema de tesis</h2>
            <div class = "row ">
                <div class="col-6">
                    <p>Ingresar título de tesis</p>
                    <input value = {search} onChange = {searcher} type="search" class="form-control icon-search" id="exampleFormControlInput1" placeholder="Título de tesis"></input>
                </div>
                <div class="col-6">
                    <p>Ingresar palabra clave</p>
                    <input value = {searchClav} onChange = {searcherClav} type="search" class="form-control icon-search" id="exampleFormControlInput1" placeholder="Palabra clave"></input>
                </div>
            </div>
            <h2>Lista de tesis</h2>
            <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
            <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
            <div class = "row LISTAR-TABLA">
            <div class=" col-12 ">
            <table class="table table-hover TABLA-BUSQ">
                        <thead>
                            <tr>
                            <th scope="col">Nro</th>
                            <th scope="col">Título de tesis</th>
                            <th scope="col">Estado</th>   
                            <th scope="col">Ver</th>                        
                            </tr>
                        </thead>

                        <tbody>
                            {results.map((temasTesis)=> (
                                <tr key = {temasTesis.idTemaTesis}>
                                    <td>{temasTesis.idTemaTesis}</td>
                                    <td>{temasTesis.tituloTesis}</td>
                                    <td>    
                                    {(() => {
                                        switch(temasTesis.estadoTema){
                                            case "Publicado" : return <td class = "text-success">{temasTesis.estadoTema}</td> ;
                                            case "Por Revisar" : return <td class = "text-warning">{temasTesis.estadoTema}</td> ;
                                            case "Rechazado" : return <td class = "text-danger">{temasTesis.estadoTema}</td> ;
                                            case "Aprobado" : return <td class = "text-success">{temasTesis.estadoTema}</td> ;
                                            case "Publicado" : return <td class = "text-success">{temasTesis.estadoTema}</td> ;
                                            case "Observado" : return <td class = "text-danger">{temasTesis.estadoTema}</td> ;
                                            case "Sustentado" : return <td class = "text-success">{temasTesis.estadoTema}</td> ;
                                            case "En Proceso" : return <td class="text-warning">{temasTesis.estadoTema} </td>;
                                            default: return <td>ERROR</td>
                                        }
                                    }) ()}
                                    </td>
                                    <td><button class="btn BTN-ACCIONES" title="Modificar tema de tesis" onClick={()=>{navigate("agregarTema/"+temasTesis.idTemaTesis)}}> <FaIcons.FaEdit /></button></td>
                                    
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
                <div className='d-grid gap-2 d-md-flex justify-content-md-end LISTAR-ESPECIALIDADES-BOTON '>
                    {aceptarTemas === 1 ?
                        <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("agregarTema/0")}}> Agregar Tema / Ver Solicitudes</button>
                        : <p class="FUENTE-LABEL">
                            El periodo de recepcion de temas ha terminado
                        </p>
                    }                    
                </div>
        </div>
        
    )
}
export default ListarTemasTesis