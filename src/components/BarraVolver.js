import React, { useState } from "react";
import "../Pagina.css";
import "../stylesheets/BarraVolver.css";
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
export function BarraVolver() {
  const url = "http://34.195.33.246/";
  const [clicked, setClicked] = useState(false);
  const [anhio, setAnhio] = useState([]);
  let navigate = useNavigate();
  const [sem, setSem] = useState([]);
  const [nom, setNom] = useState([]);
  const [esp, setEsp] = useState([]);
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked);
  };

  const InfoArribaDinamica = async () => {
    const response = await axios
      .get(
        url+"api/Curso/BuscarCursoXId",
        { params: { idCurso: localStorage.getItem("idCurso") } },
        {
          _method: "GET",
        }
      )
      .then((response) => {
        setAnhio(response.data[0].anhoSemestre);
        setSem(response.data[0].numSemestre);
        setNom(response.data[0].nombre);
        setEsp(response.data[0].nombreEspecialidad);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  InfoArribaDinamica();
  const  volverCursos=()=>{
    let escoordinador=window.localStorage.getItem("ESCOORDINADOR");
    let tipoUsuario = window.localStorage.getItem("TIPOUSUARIO")
    if(escoordinador=="SI" && tipoUsuario=="COMITE"){
      navigate('/comiteCoordinador')
    }
    else{
      navigate('/cursos');
    }
  }
  return (
    <div className="barra2 ">
      <div className="tituloSistema">
        <img
          className="imagen__barra2 mt-1"
          src={require("../imagenes/casa.png")}
          alt="casa"
        ></img>
        <h4 className="volver" style={{cursor:"pointer"}}><div onClick={()=>volverCursos()}>Volver a mis cursos</div></h4>
      </div>
      <div>
        <h4 className="titulo-info">{anhio + "-" + sem + " " + nom + " " +esp}</h4>
      </div>
    </div>
  );
}
