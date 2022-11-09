import { createContext } from "react";

const todo= {
    reunion: [],
    idAsesor: 0,
    asesorNombre: '',
    alumnos: [],
    idAlumnoSelect: [],
    idCursoSelect: '',
    tipo: 1,
};

export const AsesorContext = createContext(todo);