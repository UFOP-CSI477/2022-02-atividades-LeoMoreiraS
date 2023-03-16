import { useEffect, useState } from "react"
import api from "../../services/api";

interface EstadoInterface {
    id: number;
    name: string;
    acronym: string;
    created_at: string;
    updated_at: string;
}


const getStatesQuery ={
    "query": `query    {
        findManyStates(where:{}) {
            id
            name
              acronym
              created_at
              updated_at
        }
      }`
}


const CreateCities = () =>{
     
    const [ estados, setEstados ] = useState<EstadoInterface[]>([]);  
    console.log(estados)
    
    useEffect(() =>{

        api.post('', getStatesQuery)
            .then(response => {
                const {findManyStates} =  response.data.data;
                setEstados(findManyStates);
            })

    }, [])

    const [name, setName] = useState<string>('');
    const [acronym, setAcronym] = useState<string>('');
    const [state, setState] = useState<number>(1);
    function handleSubmit(event:any){
        event.preventDefault();
        api.post('', {query:`
            mutation    {
                createOneCities(data: {
                      name: "${name}"
                      acronym: "${acronym}"
                      state: {
                        connect: {
                            id: ${state}
                        }
                      }
                }){
                  id
                  name
                  acronym
                  created_at
                  updated_at    
                }
              }`}
        ).then(response => {
            console.log(response.data)
            if(response.status === 200){
                setName('');
                setAcronym('');
                alert("Criado com sucesso")
            }else{
                setName("Erro no cadastro");
                setAcronym("Erro no cadastro");
                alert("Erro no cadastro")
            }
        })
    
    
    }
    return(
        <div>
            <h3>
                Cadastro de Cidades
            </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}>
                        
                    </input>
                </div>
                <div>
                    <label htmlFor="acronym">Sigla</label>
                    <input type="text" name="acronym" id="acronym" value={acronym} onChange={e => setAcronym(e.target.value)}>

                    </input>
                </div>
                <div>
                    <label htmlFor="state">Estado</label>
                    <select name="state" id="state" onChange={e => setState(Number(e.target.value))}>
                    {estados.map(estado => ( 
                            <option label={estado.acronym} value={estado.id}></option>
                    ))
                    }
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateCities