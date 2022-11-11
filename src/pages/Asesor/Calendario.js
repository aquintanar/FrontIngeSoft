import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../stylesheets/Asesor.css'
import { CalendarioTablas } from './CalendarioTablas';


const url1= "https://localhost:7012/api/Entregable/";
//const url1= "http://44.210.195.91/api/Entregable/";
const url2= "https://localhost:7012/api/Curso/";
//const url2= "http://44.210.195.91/api/Curso/";

function Calendario(){
    const [ind, setInd]=useState([]);
    const [fecha, setFecha] = useState(new Date());
    const [inicio, setInicio] = useState();
    let entregas = [];
    const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    let valid =0;

    const peticionGet=async()=>{
        await axios.get(url1+"ListEntregablesXIdCurso?idCurso="+localStorage.getItem('idCurso'))
        .then(response=>{
            entregas = response.data;
            llenaSemanas();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const peticionGetCurso=async()=>{
        await axios.get(url2+"BuscarCursoXId?idCurso="+localStorage.getItem('idCurso'))
        .then(response=>{
            setInicio(numeroDeSemana(new Date(response.data[0].fechaInicio)));
            setFecha(response.data[0].fechaInicio);
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const numeroDeSemana = fecha => {
        const DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24,
            DIAS_QUE_TIENE_UNA_SEMANA = 7,
            JUEVES = 4;
        fecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()));
        let diaDeLaSemana = fecha.getUTCDay(); // Domingo es 0, sábado es 6
        if (diaDeLaSemana === 0) {
            diaDeLaSemana = 7;
        }
        fecha.setUTCDate(fecha.getUTCDate() - diaDeLaSemana + JUEVES);
        const inicioDelAño = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 1));
        const diferenciaDeFechasEnMilisegundos = fecha - inicioDelAño;
        return Math.ceil(((diferenciaDeFechasEnMilisegundos / DIA_EN_MILISEGUNDOS) + 1) / DIAS_QUE_TIENE_UNA_SEMANA);
    };

    const llenaSemanas=()=>{
        entregas.forEach(element => { 
            element.sem = numeroDeSemana(new Date(element.fechaPresentacionAlumno));
        });
        setInd(entregas);
    }

    useEffect(()=>{
        peticionGet();
        peticionGetCurso();
    },[])

    return (      
        <div>
            <div class=" CONTAINERASESOR">
                <p class="HEADER-TEXT1 mb-0"> Calendario de Evaluaciones</p>
            </div>
            <div class=" CONTAINERASESOR2">   
            {arr.map((algo) =>{
                valid =0;
                {ind.forEach(elem => {
                    if(elem.sem ===inicio+algo &&(elem.responsableEvaluar === 'Asesor' || elem.responsableSubir === 'Asesor')){
                        valid = 1;
                    }})}
                {if(valid ===1){        
                    return (   
                        <CalendarioTablas
                        ind = {ind}
                        inicio ={inicio}
                        fecha ={fecha}
                        ini = {algo}>
                        </CalendarioTablas>
                    )
                } 
                }
            })}
            </div>
        </div>
    )
}
export default  Calendario;