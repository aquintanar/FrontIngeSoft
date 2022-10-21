import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import '../../Pagina.css'
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import {  useNavigate } from 'react-router-dom';
import {  Modal, Button, TextField} from '@material-ui/core';
import {makeStyles, createTheme} from '@material-ui/core/styles';
import axios from 'axios';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import '../../stylesheets/Comite.css'
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
function ListaTemaTesis()  {
    let navigate = useNavigate();
    const styles= useStyles();
    const [data, setData] = useState([]);
    const [modalGuardar, setModalGuardar]=useState(false);


    const abrirCerrarModalGuardar=()=>{
        setModalGuardar(!modalGuardar);
    }
    const publicarTemas=()=>{
      data.forEach(function(tema, index) {
       axios.put("http://44.210.195.91/api/TemaTesis/PublicarTemaTesis?idTemaTesis="+tema.idTemaTesis)
      .then(response=>{
        console.log("Publicado");
        navigate("../temaTesis");
      }).catch(error =>{
        console.log(error.message);
      })
    
      });
    }
    const bodyGuardar=(
        <div className={styles.modal} >
          <div align = "center">
            <p class= "text-white">¿Estás seguro que desea publicar estos temas de tesis?</p>
          </div>
          <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
            <Button class="btn  btn-success"  onClick={()=>publicarTemas()}>Confirmar</Button>
            <Button class="btn btn-danger" onClick={()=>abrirCerrarModalGuardar()}>Cancelar</Button>
          </div>
        </div>
      )

    useEffect(() => {
        getData();
    }, []);
   
    async function getData() {
      const response = await fetch("http://44.210.195.91/api/TemaTesis/GetTemaTesis");
      const data = await response.json();
      setData(data);
   };

    const selectRow = {
        mode : "checkbox",
    };
    const funcFormatter = (data, row ) => {
      console.log(  row.idTemaTesis  );
      return <button className="btn" onClick={()=>{navigate("temaSeleccionado/"+row.idTemaTesis,{state:{id:row.idTemaTesis,titulo:row.tituloTesis,estado:row.estadoTema,
        descripcion:row.descripcion,asesor:row.idAsesor,nombresAsesor:row.nombresAsesor,apellidoPatAsesor:row.apePatAsesor,area:row.idArea,areaNombre:row.nombreArea,alumno:row.idAlumno,nombresAlumno:row.nombresAlumno,apellidoPatAlumno:row.apePatAlumno,
        motivoRechazo:row.motivoRechazo,palabraClave1:row.PalabraClave1,palabraClave2:row.PalabraClave2,fedd:row.feedback}})}}> {data} </button>

 
  }
  const { SearchBar } = Search;
    const columns = [
        {
            dataField: "idTemaTesis",
            text: "Id",
            sort: true,
            //filter: textFilter(),
            formatter: funcFormatter,
            headerStyle: {
                backgroundColor: '#042354',
                color: 'white',
            },
        },

        {
            dataField: "tituloTesis",
            text: "Título",
            sort: true,
            //filter: textFilter(),
            formatter: funcFormatter,
            headerStyle: {
                backgroundColor: '#042354',
                color: 'white',
            },
        },
        {
            dataField: "descripcion",
            text: "Descripción",
            sort: true,
            //filter: textFilter(),
            formatter: funcFormatter,
            headerStyle: {
                backgroundColor: '#042354',
                color: 'white',
            },
        }
        ,
        {
            dataField: "estadoTema",
            text: "Estado",
            sort: true,
            //filter: textFilter(),
            formatter: funcFormatter,
            headerStyle: {
                backgroundColor: '#042354',
                color: 'white',
            },
        },

        {
            dataField: "nombreArea",
            text: "Área",
            sort: true,
            //filter: textFilter(),
            formatter: funcFormatter,
            headerStyle: {
                backgroundColor: '#042354',
                color: 'white',
            },

           
        },
        {
            dataField: "PalabraClave1",
            text: "PalabraClave 1",
            sort: true,
            //filter: textFilter(),
            formatter: funcFormatter,
            headerStyle: {
                backgroundColor: '#042354',
                color: 'white',
            },

           
        },
        {
          dataField: "PalabraClave2",
          text: "PalabraClave 2",
          sort: true,
          //filter: textFilter(),
          formatter: funcFormatter,
          headerStyle: {
              backgroundColor: '#042354',
              color: 'white',
          },

         
      }
  
    ];

    return (
        <div>    
              <div className=" LISTAR-TEMAS-CONTAINER">
                    <h2 className="TEMAS-TEXT">Temas</h2>
                    <div className="contenedorTabla">
                        <h4 className=" LISTADO-TEMAS-TEXT"> Listado de Propuestas  </h4>
                        <ToolkitProvider
                          keyField="idTemaTesis"
                          data={ data.slice(0,4) }
                          columns={ columns }
                          search
                          >
                          {
                            props => (
                              <div>
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                   class="black white-text"
                                   keyField="idTemaTesis"
                                   data={data}
                                   columns={columns}
                                   filter={filterFactory()}
                                   bordered={ false }
                                  { ...props.baseProps }
                                />
                              </div>
                            )
                          }
                        </ToolkitProvider>
                        <h1> </h1> 
                        <div className='LISTAR-BOTON'>
                        <button   onClick={()=>abrirCerrarModalGuardar()} className="btn btn-primary fs-4 fw-bold mb-3">Publicar</button>
                        </div>  
                        <p> </p>   
                    </div>
    
            </div>
            <Modal
            open={modalGuardar}
        onClose={abrirCerrarModalGuardar}>
          {bodyGuardar}
             </Modal>
        </div>
        
    )
  }
  

export default ListaTemaTesis;