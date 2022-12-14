import React, { useState, useEffect } from 'react';
import DatosRubrica from './DatosRubrica';
import DatosEntregable from './DatosEntregable';
import axios from 'axios';
import '../../stylesheets/Administrador.css'
import { useParams } from 'react-router-dom';

const url1= "http://34.195.33.246/api/Entregable/";
const url2= "http://34.195.33.246/api/DetalleRubrica/";

//const url1= "http://44.210.195.91/api/Entregable/";
//const url2= "http://44.210.195.91/api/DetalleRubrica/";

function Entregable() {
    const[active, setActive] = useState("datosEntregable");
    const[formato, setFormato] = useState("botonActivo1");
    let {id} = useParams();
    const [cero,Setcero] = useState(1); 
    const[entregable, setEntregable] = useState({
        idEntregable: 0,
        nombre: '',
        descripcion:'',
        fechaEntregaAsesor: new Date(),
        fechaLimite: new Date(),
        fechaPresentacionAlumno: new Date(),
        responsableSubir: 1,
        responsableEvaluar: 2,
        fidTipoEntregable: 1,
        fidCurso: localStorage.getItem('idCurso'),
        fidNota: 0,
    })

    const[rubricas, setRubricas] = useState([]);
    const[rubs, setRubs] = useState([]);
    const[idRub, setIdrub] = useState(0);
    let aux=[];
     //Carga especialidad a modificar
    const cargaEntregable=async()=>{
        if(id!=='0'){
            await axios.get(url1+"BuscarEntregableXId?idEntregable="+parseInt(id)).
            then(response=>{
                let aux = response.data[0];
                setIdrub(aux.idRubrica);
                if(aux.fechaEntregaAsesor==="null"){
                    aux.fechaEntregaAsesor = 0;
                    aux.responsableSubir =0;
                }
                setEntregable({
                    idEntregable: aux.idEntregable,
                    nombre: aux.nombre,
                    descripcion: aux.descripcion,
                    fidCurso: aux.fidCurso,
                    fechaEntregaAsesor: !aux.fechaEntregaAsesor?0:new Date(aux.fechaEntregaAsesor),
                    fechaLimite: new Date(aux.fechaLimite),
                    fechaPresentacionAlumno: new Date(aux.fechaPresentacionAlumno),
                    responsableSubir:  aux.responsableSubir,
                    responsableEvaluar:  aux.responsableEvaluar,
                    fidTipoEntregable: aux.fidTipoEntregable,
                    fidNota: 1
                });
            });
        }
    }

    const infoCurso = async () => {
        const response = await axios
          .get(
            "http://34.195.33.246/api/Curso/BuscarCursoXId",
            { params: { idCurso: localStorage.getItem("idCurso") } },
            {
              _method: "GET",
            }
          )
          .then((response) => {
            response.data[0].numTesis === 1? entregable.fidTipoEntregable=1:entregable.fidTipoEntregable=5;
          })
          .catch((error) => {
            console.log(error.message);
          });
      };

    const cargaRubricas=async()=>{
        if(id!=='0'){
            const response = await axios.get(url2+"ListDetalleRubricaXIdEntregable?idEntregable="+parseInt(id));
            setRubricas(response.data);
            aux = response.data;
            setRubs([].concat(aux));
        }
    }

    const verifica=async()=>{
        if(id!=='0'){
            setActive("datosRubrica");
        }
    }

    useEffect(()=>{
        cargaEntregable();
        cargaRubricas();
        verifica();
        infoCurso();
    },[])


    return (
        <div>
             <nav className="CONTAINERENTREGABLE">
                    <div class="row">
                        <div class="col BOTONES_SUPERIORES">
                            <button onClick={() => {setActive("datosEntregable");setFormato("botonActivo1")}} className={"botonActivo1" === formato ? "customButton active" : "customButton"}>Datos Entrega o Presentaci??n</button>
                        </div>
                        <div class="col BOTONES_SUPERIORES">
                            <button onClick={() => {setActive("datosRubrica");setFormato("botonActivo2")}} className={"botonActivo2" === formato ? "customButton active" : "customButton"}>Datos R??brica</button>
                        </div>
                    </div>
            </nav>          
            <div >
               
                <div>
                    {active === "datosEntregable" && <DatosEntregable entregable={entregable} setEntregable={setEntregable} active={active} setActive={setActive} cero={cero}/>}
                    {active === "datosRubrica" && <DatosRubrica entregable={entregable} setEntregable={setEntregable} rubricas={rubricas} setRubricas={setRubricas} id={id} rubs={rubs} idRub={idRub}/>}
                </div>
                
            </div>
        </div>
    )
  }
  
export default Entregable;