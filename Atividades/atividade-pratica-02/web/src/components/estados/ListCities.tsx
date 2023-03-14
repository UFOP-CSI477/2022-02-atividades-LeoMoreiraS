import { useEffect, useState } from "react"
import api from "../../services/api"

interface ICities {
    id: number;
    name: string;
    acronym: string;
    created_at: string;
    updated_at: string;
    state: {
        name:string;
        acronym:string;
    }
}


const getCitiesQuery ={
    "query": `query    {
        findManyCities(where:{}) {
              id
              name
              acronym
              created_at
              updated_at
              state {
                  name
                  acronym
              }
         }
      }`
}

const ListCities = () => {
    
    const [ cities, setCities ] = useState<ICities[]>([]);  
    console.log(cities)
    
    useEffect(() =>{

        api.post('', getCitiesQuery)
            .then(response => {
                const {findManyCities} =  response.data.data;
                setCities(findManyCities);
            })

    }, [])

    return(

        <div>

            <h2>Lista de Cidades</h2>

            <table>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>Estado</th>
                        <th>Sigla</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                    </tr>
                </thead>
                
                <tbody>
                    {cities.map(city => ( 
                        <tr key={city.id}>
                            <td>{city.id}</td>
                            <td>{city.name}</td>
                            <td>{city.acronym}</td>
                            <td>{city.state.name}</td>
                            <td>{city.state.acronym}</td>
                            <td>{new Date(city.created_at).toLocaleDateString('pt-br')}</td>
                            <td>{new Date(city.updated_at).toLocaleDateString('pt-br')}</td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </div>

    )

}

export default ListCities;