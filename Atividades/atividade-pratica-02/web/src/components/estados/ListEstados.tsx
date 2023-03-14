import { useEffect, useState } from "react"
import api from "../../services/api"

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

const ListEstados = () => {
    
    const [ estados, setEstados ] = useState<EstadoInterface[]>([]);  
    console.log(estados)
    
    useEffect(() =>{

        api.post('', getStatesQuery)
            .then(response => {
                const {findManyStates} =  response.data.data;
                setEstados(findManyStates);
            })

    }, [])

    return(

        <div>

            <h2>Lista de Estados</h2>

            <table>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                    </tr>
                </thead>
                
                <tbody>
                    {estados.map(estado => ( 
                        <tr key={estado.id}>
                            <td>{estado.id}</td>
                            <td>{estado.name}</td>
                            <td>{estado.acronym}</td>
                            <td>{new Date(estado.created_at).toLocaleDateString('pt-br')}</td>
                            <td>{new Date(estado.updated_at).toLocaleDateString('pt-br')}</td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </div>

    )

}

export default ListEstados;