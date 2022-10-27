import React, { useState } from 'react';
import '../Pagina.css'
import '../stylesheets/BarraVolver.css'

export function BarraVolver() {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        //cuando esta true lo pasa a false y vice versa
        setClicked(!clicked)
    }
    return (
        <div className="barra2 " >
            <div className="tituloSistema">
                <img className="imagen__barra2" src={require('../imagenes/casa.png')} alt="casa"></img>
                <h4 >Volver a mis cursos</h4>
            </div>
            <div>
                <h4>2022-2 Tesis1 - Ing. Informatica()</h4>
            </div>
        </div>
    );
}

