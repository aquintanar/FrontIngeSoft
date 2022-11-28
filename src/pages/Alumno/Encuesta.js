import React, {useState,useEffect,useLayoutEffect,useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../stylesheets/Asesor.css'
const url1= "https://localhost:7012/api/Entregable/";
//const url1= "http://44.210.195.91/api/Entregable/";
const url2= "https://localhost:7012/api/Curso/";
//const url2= "http://44.210.195.91/api/Curso/";
const urlPregunta = "https://localhost:7012/api/PreguntaEncuesta/"
const urlDetallePreguntaEncuesta = "https://localhost:7012/api/DetallePreguntaEncuesta/"

//https://localhost:7012/api/PreguntaEncuesta/BuscarPreguntaEncuestaXIdEncuesta?idEncuesta=3
const Encuesta = () => {
    let navigate = useNavigate();
    const [preguntaActual , setPreguntaActual] = useState(0) ; 
    const [preguntas,SetPreguntas] = useState([]);
    const [cuestionario ,SetCuestionario] = useState([]);
    const [data,setData] = useState([]);
    const [isFinished , setFinished] = useState(false); 
    const[puntaje,setPuntaje] = useState();
    const [rpta , setRpta] = useState({
        fidAlumno: 1,
        fidAsesor: 2,
        fidPreguntaEncuesta: 0,
        respuesta: '',
    })
    
    function handleNextQuestion(){
        setRpta({
            fidAlumno: 1,
            fidAsesor: 2,
            fidPreguntaEncuesta: preguntas[preguntaActual].idPreguntaEncuesta,
            respuesta : puntaje, 
        })
        console.log(rpta)
        peticionPostRpta(rpta)
        if (preguntaActual === preguntas.length - 1 ){
            setFinished(true);
            navigate("../gestion/gesPortafolio")
        }else{
            setPreguntaActual(preguntaActual + 1 ) ; 
        }
    }

    function handleNextQuestion2(){
        if (preguntaActual <= 0 ){
            setPreguntaActual(0)
        }
        else {
            setPreguntaActual(preguntaActual -1  ) ;
        }
         
    }

 



    const peticionPostRpta=async(respuestaSeleccionada)=>{
        console.log(respuestaSeleccionada)
        await axios.post(urlDetallePreguntaEncuesta+"InsertarDetallePreguntaEncuesta",respuestaSeleccionada)
        .then(response=>{
          console.log(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
      }
    let pregs = [] ;
    const peticionGetPreguntas=async()=>{
        let aux ; 
        await axios.get(urlPregunta+"BuscarPreguntaEncuestaXIdEncuesta?idEncuesta=3")
        .then(response=>{
            console.log("PETICION PREGUNTA EJECUTADA");
            console.log(response.data);
            pregs = response.data;
            aux = response.data ;
            SetPreguntas([pregs]);
            SetCuestionario(aux);
            console.log(preguntas)
        }).catch(error =>{
            console.log(error.message);
        })
        console.log(pregs)
        SetPreguntas(pregs)
        console.log(preguntas)
    }
    useEffect(() => {
        peticionGetPreguntas();
        //nsole.log(pregs)
        //console.log(preguntas)
        
    },[peticionGetPreguntas]);
    //peticionGetPreguntas();
    //ciclo de vida del componente de react algo de moutnh
    return (      
        <div>
            <div class=" CONTAINERASESOR">
                <p class="HEADER-TEXT1 mb-0">Encuesta de satisfacción</p>
            </div>
            
            <div class = " CONTAINERASESOR2">
                <div className >
                    <div className >
                        <span> Pregunta {preguntaActual  + 1 }  de </span> {preguntas.length}
                    </div>
                    <div>
                           {/*preguntas[preguntaActual].pregunta*/} 
                    </div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value = "5" onChange={e=>setPuntaje(e.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        5. Totalmente de acuerdo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value = "4" onChange={e=>setPuntaje(e.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        4. Parcialmente de acuerdo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value = "3" onChange={e=>setPuntaje(e.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault3">
                        3. Ni de acuerdo ni en desacuerdo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value = "2" onChange={e=>setPuntaje(e.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault4">
                        2. Parcialmente en desacuerdo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" value = "1" onChange={e=>setPuntaje(e.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault5">
                        1. Totalmente en desacuerdo
                    </label>
                </div>
                <br></br>
                <div className='d-grid gap-2 d-md-flex justify-content-start LISTAR-ESPECIALIDADES-BOTON '>
                    <button type="button" class="btn btn-primary fs-4 fw-bold" id = "botnnext" onClick={handleNextQuestion2}>Atras</button>
                    <button type="button" class="btn btn-primary fs-4 fw-bold" id = "botnnext" onClick={handleNextQuestion}>Guardar respuesta</button>
                </div>
               
                
            </div>
            
        </div>
    )
}
export default  Encuesta;