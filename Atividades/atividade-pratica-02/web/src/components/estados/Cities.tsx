import { useEffect, useState } from "react";
import api from "../../services/api";
import AbstractModal from "../modal/AbstractModal";

interface ICities {
    id: number;
    name: string;
    acronym: string;
    created_at: string;
    updated_at: string;
    state: {
        name: string;
        acronym: string;
    };
}
type City = {
    id: number,
    name: string,
    acronym: string,
}
interface EstadoInterface {
    id: number;
    name: string;
    acronym: string;
    created_at: string;
    updated_at: string;
}

const getStatesQuery = {
    query: `query    {
        findManyStates(where:{}) {
            id
            name
              acronym
              created_at
              updated_at
        }
      }`,
};

const getCitiesQuery = {
    query: `query    {
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
      }`,
};

const Cities = () => {
    const [trigger, setTrigger] = useState<Boolean>(false)
    const [cities, setCities] = useState<ICities[]>([]);

    useEffect(() => {
        api.post("", getCitiesQuery).then((response) => {
            const { findManyCities } = response.data.data;
            setCities(findManyCities.sort((a:ICities,b:ICities)=>(a.id-b.id)));
            if(trigger)
                setTrigger(false);
        });
    }, [trigger]);

    const [estados, setEstados] = useState<EstadoInterface[]>([]);


    useEffect(() => {
        api.post("", getStatesQuery).then((response) => {
            const { findManyStates } = response.data.data;
            setEstados(findManyStates);
        });
    }, []);

    const [name, setName] = useState<string>("");
    const [acronym, setAcronym] = useState<string>("");
    const [state, setState] = useState<number>(1);


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<City>({
        name: "",
        id: 0,
        acronym: "",
    });



    const handleSubmitModal = () => {
        api
            .post("", {
                query: `
        mutation {
            updateOneCities(
              where: { id: ${formData.id} }
              data: {
                name: {set: "${formData.name}"}
                acronym: {set: "${formData.acronym}"}
              }
            ) {
              id
              name
              acronym
            }
          }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setName("");
                    setAcronym("");
                    setTrigger(true);
                    alert("Atualizado com sucesso");
                } else {
                    setName("Erro na atualização");
                    setAcronym("Erro na atualização");
                    alert("Erro na atualização");
                }
            });

    };
    console.log(formData)
    const handleOpen = (data: City) => {
        console.log(data);
        setIsOpen(true);
        setFormData(data)
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    function handleSubmit(event: any) {
        event.preventDefault();
        api
            .post("", {
                query: `
            mutation    {
                createOneCities(data: {
                      name: "${name}"
                      acronym: "${acronym.toLocaleUpperCase()}"
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
              }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setName("");
                    setAcronym("");
                    setTrigger(true);
                    alert("Criado com sucesso");
                } else {
                    setName("Erro no cadastro");
                    setAcronym("Erro no cadastro");
                    alert("Erro no cadastro");
                }
            });
    }


    return (
        <div>
            <div>
                <h3>Cadastro de Cidades</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="acronym">Sigla</label>
                        <input
                            type="text"
                            name="acronym"
                            id="acronym"
                            value={acronym}
                            onChange={(e) => setAcronym(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="state">Estado</label>
                        <select
                            name="state"
                            id="state"
                            onChange={(e) => setState(Number(e.target.value))}
                        >
                            {estados.map((estado) => (
                                <option label={estado.acronym} value={estado.id}></option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </form>
            </div>

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
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cities.map((city) => (
                            <tr key={city.id}>
                                <td>{city.id}</td>
                                <td>{city.name}</td>
                                <td>{city.acronym}</td>
                                <td>{city.state.name}</td>
                                <td>{city.state.acronym}</td>
                                <td>{new Date(city.created_at).toLocaleDateString("pt-br")}</td>
                                <td>{new Date(city.updated_at).toLocaleDateString("pt-br")}</td>
                                <td><button onClick={(e) => { handleOpen({ name: city.name, acronym: city.acronym, id: city.id }) }}>edit</button></td>
                                <td><button onClick={() => {
                                    api.post('', {
                                        query: `mutation {
                                                    deleteOneCities(where: { id: ${city.id} }) {
                                                        id
                                                        name
                                                        acronym
                                                    }
                                                }`}
                                    ).then((response)=>{
                                        if (response.status === 200) {
                                            setTrigger(true);
                                            alert("Removido com sucesso");
                                        } else {
                                            alert("Erro na remoção");
                                        }
                                    })
                                }}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AbstractModal<City>
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleSubmitModal}
                data={formData}
                setter={setFormData}
            />
        </div>

    );
};

export default Cities;
