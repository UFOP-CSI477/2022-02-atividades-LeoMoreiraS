import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AbstractModal from "../modal/AbstractModal";

interface IPeoples {
    id: number;
    name: string;
    street: string;
    number: string;
    complement: string;
    document: string;
    created_at: string;
    updated_at: string;
    city: {
        name: string;
        acronym: string;
    };
    type: {
        factor: string;
        type: string;
    };
}
type People = {
    id: number,
    name: string,
    street: string,
    number: string,
    complement: string
    document: string;
}

interface BloodInterface {
    id: number;
    type: string;
    factor: string;
    created_at: string;
    updated_at: string;
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

const getBloodTypeQuery = {
    query: `query    {
        bloodTypes(where:{}) {
            id
            type
              factor
              created_at
              updated_at
        }
      }`,
};

const getPeoplesQuery = {
    query: `query    {
        findManyPeople(where:{}) {
              id
              name
              street
              number
              complement
              document
              created_at
              updated_at
              city {
                  name
                  acronym
              }
              type {
                  factor
                  type
              }
         }
      }`,
};

const Peoples = () => {
    const [trigger, setTrigger] = useState<Boolean>(false)
    const [Peoples, setPeoples] = useState<IPeoples[]>([]);

    useEffect(() => {
        api.post("", getPeoplesQuery).then((response) => {
            const { findManyPeople } = response.data.data;
            setPeoples(findManyPeople.sort((a: IPeoples, b: IPeoples) => (a.id - b.id)));
            if (trigger)
                setTrigger(false);
        });
    }, [trigger]);

    const [Cidades, setCidades] = useState<CidadeInterface[]>([]);
    const [blood, setBlood] = useState<BloodInterface[]>([]);


    useEffect(() => {
        api.post("", getCitiesQuery).then((response) => {
            const { findManyCities } = response.data.data;
            setCidades(findManyCities);
            setcity(findManyCities[0].id);
        });
    }, []);
    
    useEffect(() => {
        api.post("", getBloodTypeQuery).then((response) => {
            const { bloodTypes } = response.data.data;
            setBlood(bloodTypes);
            setBloodType(bloodTypes[0].id);
        });
    }, []);

    const [name, setName] = useState<string>("");
    const [street, setstreet] = useState<string>("");
    const [city, setcity] = useState<number>(1);
    const [bloodType, setBloodType] = useState<number>(1);
    const [number, setNumber] = useState<string>("");
    const [complement, setComplement] = useState<string>("");
    const [document, setDocument] = useState<string>("");


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<People>({
        name: "",
        id: 0,
        street: "",
        number: "",
        complement: "",
        document: ""
    });



    const handleSubmitModal = () => {
        api
            .post("", {
                query: `
        mutation {
            updateOnePeople(
              where: { id: ${formData.id} }
              data: {
                name: {set: "${formData.name}"}
                street: {set: "${formData.street}"}
                number: {set: "${formData.number}"}
                complement: {set: "${formData.complement}"}
                document: {set: "${formData.document}"}
              }
            ) {
              id
              name
              street
              complement
              number 
              document 
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
    const handleOpen = (data: People) => {
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
                    createOnePeople(data: {
                          name: "${name}"
                          street: "${street}"
                          number: "${number}"
                          complement: "${complement}"
                          document: "${document}"
                          city: {
                            connect: {
                                id: ${city}
                            }
                          }
                          type: {
                            connect: {
                                id: ${bloodType}
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
                <h3>Cadastro de Pessoas</h3>
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
                        <label htmlFor="document">Document</label>
                        <input
                            type="text"
                            name="document"
                            id="document"
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
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
                    <div>
                        <label htmlFor="bloodType">Tipo Sanguíneo</label>
                        <select
                            name="bloodType"
                            id="bloodType"
                            onChange={(e) => setBloodType(Number(e.target.value))}
                        >
                            {blood.map((bloo) => (
                                <option label={`${bloo.type} - ${bloo.factor}`} value={bloo.id}></option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </form>
            </div>

            <div>
                <h2>Lista de Pessoas</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Rua</th>
                            <th>Número</th>
                            <th>Complemento</th>
                            <th>Documento</th>
                            <th>Cidade</th>
                            <th>Sigla</th>
                            <th>Tipo Sanguíneo</th>
                            <th>Criado</th>
                            <th>Alterado</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Peoples.map((People) => (
                            <tr key={People.id}>
                                <td>{People.id}</td>
                                <td>{People.name}</td>
                                <td>{People.street}</td>
                                <td>{People.number}</td>
                                <td>{People.complement}</td>
                                <td>{People.document}</td>
                                <td>{People.city.name}</td>
                                <td>{People.city.acronym}</td>
                                <td>{People.type.type} - {People.type.factor}</td>
                                <td>{new Date(People.created_at).toLocaleDateString("pt-br")}</td>
                                <td>{new Date(People.updated_at).toLocaleDateString("pt-br")}</td>
                                <td><button onClick={(e) => {
                                    handleOpen({
                                        name: People.name,
                                        street: People.street,
                                        id: People.id,
                                        complement: People.complement,
                                        number: People.number,
                                        document: People.document
                                    })
                                }}>edit</button></td>
                                <td><button onClick={() => {
                                    api.post('', {
                                        query: `mutation {
                                                    deleteOnePeople(where: { id: ${People.id} }) {
                                                        id
                                                        name
                                                        street
                                                        complement
                                                        number
                                                        document
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
            <AbstractModal<People>
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

export default Peoples;
