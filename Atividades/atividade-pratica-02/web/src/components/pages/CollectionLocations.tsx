import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AbstractModal from "../modal/AbstractModal";

interface ICollectionLocations {
    id: number;
    name: string;
    street: string;
    number: string;
    complement: string;
    created_at: string;
    updated_at: string;
    city: {
        name: string;
        acronym: string;
    };
}
type CollectionLocation = {
    id: number,
    name: string,
    street: string,
    number: string,
    complement: string
}
interface CidadeInterface {
    id: number;
    name: string;
    acronym: string;
    created_at: string;
    updated_at: string;
}

const getCitiesQuery = {
    query: `query    {
        findManyCities(where:{}) {
            id
            name
              acronym
              created_at
              updated_at
        }
      }`,
};

const getCollectionLocationsQuery = {
    query: `query    {
        findManyCollectionLocations(where:{}) {
              id
              name
              street
              number
              complement
              created_at
              updated_at
              city {
                  name
                  acronym
              }
         }
      }`,
};

const CollectionLocations = () => {
    const [trigger, setTrigger] = useState<Boolean>(false)
    const [CollectionLocations, setCollectionLocations] = useState<ICollectionLocations[]>([]);

    useEffect(() => {
        api.post("", getCollectionLocationsQuery).then((response) => {
            const { findManyCollectionLocations } = response.data.data;
            setCollectionLocations(findManyCollectionLocations.sort((a: ICollectionLocations, b: ICollectionLocations) => (a.id - b.id)));
            if (trigger)
                setTrigger(false);
        });
    }, [trigger]);

    const [Cidades, setCidades] = useState<CidadeInterface[]>([]);


    useEffect(() => {
        api.post("", getCitiesQuery).then((response) => {
            const { findManyCities } = response.data.data;
            setCidades(findManyCities);
        });
    }, []);

    const [name, setName] = useState<string>("");
    const [street, setstreet] = useState<string>("");
    const [city, setcity] = useState<number>(1);
    const [number, setNumber] = useState<string>("");
    const [complement, setComplement] = useState<string>("");


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<CollectionLocation>({
        name: "",
        id: 0,
        street: "",
        number: "",
        complement: "",
    });



    const handleSubmitModal = () => {
        api
            .post("", {
                query: `
        mutation {
            updateOneCollectionLocations(
              where: { id: ${formData.id} }
              data: {
                name: {set: "${formData.name}"}
                street: {set: "${formData.street}"}
                number: {set: "${formData.number}"}
                complement: {set: "${formData.complement}"}
              }
            ) {
              id
              name
              street
              complement
              number
            }
          }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setName("");
                    setstreet("");
                    setTrigger(true);
                    alert("Atualizado com sucesso");
                } else {
                    setName("Erro na atualização");
                    setstreet("Erro na atualização");
                    alert("Erro na atualização");
                }
            });

    };
    console.log(formData)
    const handleOpen = (data: CollectionLocation) => {
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
                    createOneCollectionLocations(data: {
                          name: "${name}"
                          street: "${street}"
                              number: "${number}"
                              complement: "${complement}"
                          city: {
                            connect: {
                                id: ${city}
                            }
                          }
                    }){
                      id
                      name
                      street
                      number		
                      complement
                      created_at
                      updated_at    
                    }
                  }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setName("");
                    setstreet("");
                    setComplement("");
                    setNumber("");
                    setTrigger(true);
                    alert("Criado com sucesso");
                } else {
                    setName("Erro no cadastro");
                    setComplement("Erro no cadastro");
                    setNumber("Erro no cadastro");
                    setstreet("Erro no cadastro");
                    alert("Erro no cadastro");
                }
            });
    }


    return (
        <div>
            <div>
                <h3>Cadastro de Locais de Coleta</h3>
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
                        <label htmlFor="street">Rua</label>
                        <input
                            type="text"
                            name="street"
                            id="street"
                            value={street}
                            onChange={(e) => setstreet(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="number">Número</label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="complement">Complemento</label>
                        <input
                            type="text"
                            name="complement"
                            id="complement"
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <select
                            name="city"
                            id="city"
                            onChange={(e) => setcity(Number(e.target.value))}
                        >
                            {Cidades.map((Cidade) => (
                                <option label={Cidade.acronym} value={Cidade.id}></option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </form>
            </div>

            <div>
                <h2>Lista de Locais de Coleta</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Rua</th>
                            <th>Número</th>
                            <th>Complemento</th>
                            <th>Cidade</th>
                            <th>Sigla</th>
                            <th>Criado</th>
                            <th>Alterado</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {CollectionLocations.map((CollectionLocation) => (
                            <tr key={CollectionLocation.id}>
                                <td>{CollectionLocation.id}</td>
                                <td>{CollectionLocation.name}</td>
                                <td>{CollectionLocation.street}</td>
                                <td>{CollectionLocation.number}</td>
                                <td>{CollectionLocation.complement}</td>
                                <td>{CollectionLocation.city.name}</td>
                                <td>{CollectionLocation.city.acronym}</td>
                                <td>{new Date(CollectionLocation.created_at).toLocaleDateString("pt-br")}</td>
                                <td>{new Date(CollectionLocation.updated_at).toLocaleDateString("pt-br")}</td>
                                <td><button onClick={(e) => {
                                    handleOpen({
                                        name: CollectionLocation.name,
                                        street: CollectionLocation.street,
                                        id: CollectionLocation.id,
                                        complement: CollectionLocation.complement,
                                        number: CollectionLocation.number
                                    })
                                }}>edit</button></td>
                                <td><button onClick={() => {
                                    api.post('', {
                                        query: `mutation {
                                                    deleteOneCollectionLocations(where: { id: ${CollectionLocation.id} }) {
                                                        id
                                                        name
                                                        street
                                                    }
                                                }`}
                                    ).then((response) => {
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
            <AbstractModal<CollectionLocation>
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleSubmitModal}
                data={formData}
                setter={setFormData}
            />
            <Link to="/">voltar</Link>
        </div>

    );
};

export default CollectionLocations;
