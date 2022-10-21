import React ,{useState , useEffect} from "react";

const SearchComponent = ({show, setShow, temaTesis, setTemaTesis}) =>{
    //setear los hooks useState
    const[Titles , setTitles] = useState([]);
    const[search , setSearch] = useState("");
    const[searchClav,  setSearchClav] = useState("");
    const[record , setRecord] = useState([]);
    const[modelData , setModelData] = useState({
        id:"",
        titulo:"",
        estadoTema:""
    })

    //local
        //https://localhost:7012/
        //EC2
        // http://44.210.195.91/

    const URL = "https://localhost:7012/api/TemaTesis/GetTemaTesis";
    const showData = async() => {
        const response = await fetch(URL)
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

    useEffect(()=>{
        console.log(Titles)
        showData()
    },[])
    
    return (
        <div class = "container">
            <div class = "row">
                <div class = "col-9">
                <h1 class = "cambiar-color">Buscar tema de tesis</h1>
                <div class="mb-3 row">
                    <label  class="col-form-label">Título de tesis</label>
                    <div class = "col-sm-12">
                    <input value = {search} onChange = {searcher} type="text" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder=" Buscar"></input>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label  class="col-form-label">Palabra clave</label>
                    <div class = "col-sm-12">
                    <input value = {searchClav} onChange = {searcherClav} type="text" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder=" Buscar por palabra clave"></input>
                    </div>
                </div>
                </div>
            </div> 
            <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Nro</th>
                            <th scope="col">Titulo de tesis</th>
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
                                            default: return <td>ERROR</td>
                                        }
                                    }) ()}
                                    </td>
                                    <td><button class = "btn" onClick={()=>{ 
                                        setTemaTesis({
                                            idTema: temasTesis.idTemaTesis,
                                            tituloTesis: temasTesis.tituloTesis,
                                            estadoTema: temasTesis.estadoTema,
                                            descripcion: temasTesis.descripcion,
                                            palabraClave1: temasTesis.palabraClave1,
                                            palabraClave2: temasTesis.palabraClave2,
                                            feedback:temasTesis.feedback,
                                        }); setShow(false)
                                    }}> Seleccionar</button></td>
                                    
                                </tr>

                            ))}
                        </tbody>

                    </table> 
        </div>
        
    )
}
export default SearchComponent