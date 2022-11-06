import React, { useState } from "react";
import "../Pagina.css";
import "../stylesheets/BarraVolver.css";
import axios from "axios";
export function BarraVolver() {
  const [clicked, setClicked] = useState(false);
  const [anhio, setAnhio] = useState([]);
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
        "https://localhost:7012/api/Curso/BuscarCursoXId",
        { params: { idCurso: localStorage.getItem("idCurso") } },
        {
          _method: "GET",
        }
      )
      .then((response) => {
        setAnhio(response.data[0].anhoSemestre);
        setSem(response.data[0].numSemestre);
        setNom(response.data[0].nombre);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  InfoArribaDinamica();
  return (
    <div className="barra2 ">
      <div className="tituloSistema">
        <img
          className="imagen__barra2"
          src={require("../imagenes/casa.png")}
          alt="casa"
        ></img>
        <h4><a href="/cursos">Volver a mis cursos</a></h4>
      </div>
      <div>
        <h4>{anhio + "-" + sem + " " + nom}</h4>
      </div>
    </div>
  );
}
