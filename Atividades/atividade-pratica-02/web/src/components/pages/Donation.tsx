import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AbstractModal from "../modal/AbstractModal";

interface IDonation {
    id: number;
    data: string;
    created_at: string;
    updated_at: string;
    location: {
        name: string;
        street: string;
    };
    people: {
        name: string;
        document: string;
    };
}
type Donation = {
    id: number,
    data: string,
}

interface CollectionLocationInterface {
    id: number;
    street: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface PeopleInterface {
    id: number;
    name: string;
    document: string;
    created_at: string;
    updated_at: string;
}

const getPeopleQuery = {
    query: `query    {
        findManyPeople(where:{}) {
            id
            street
            name
              number
              complement
              document
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
         }
      }`,
}

const getDonationQuery = {
    query: `query    {
        findManyDonations(where:{}) {
              id
              data
              created_at
              updated_at
              people {
                  name
                  document
              }
              location {
                  name
                  street
              }
         }
      }`,
};

const Donations = () => {
    const [trigger, setTrigger] = useState<Boolean>(false)
    const [Donation, setDonation] = useState<IDonation[]>([]);

    useEffect(() => {
        api.post("", getDonationQuery).then((response) => {
            const { findManyDonations } = response.data.data;
            setDonation(findManyDonations.sort((a: IDonation, b: IDonation) => (a.id - b.id)));
            if (trigger)
                setTrigger(false);
        });
    }, [trigger]);

    const [peoples, setPeoples] = useState<PeopleInterface[]>([]);
    const [collectionLocations, setCollectionLocations] = useState<CollectionLocationInterface[]>([]);


    useEffect(() => {
        api.post("", getPeopleQuery).then((response) => {
            const { findManyPeople } = response.data.data;
            console.log(findManyPeople);
            setPeoples(findManyPeople);
            setpeople(findManyPeople[0].id);
        });
    }, []);
    
    useEffect(() => {
        api.post("", getCollectionLocationsQuery).then((response) => {
            const { findManyCollectionLocations } = response.data.data;
            setCollectionLocations(findManyCollectionLocations);
            setCollectionLocation(findManyCollectionLocations[0].id);
        });
    }, []);

    const [data, setData] = useState<string>("");
    const [people, setpeople] = useState<number>(1);
    const [collectionLocation, setCollectionLocation] = useState<number>(1);
    
    


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Donation>({
        data: new Date().toDateString(),
        id: 0,
    });



    const handleSubmitModal = () => {
        api
            .post("", {
                query: `
        mutation {
            updateOneDonations(
              where: { id: ${formData.id} }
              data: {
                data: {set: "${formData.data}"}
              }
            ) {
              id
              data
            }
          }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setData("");
                    setTrigger(true);
                    alert("Atualizado com sucesso");
                } else {
                    setData("Erro na atualização");
                    alert("Erro na atualização");
                }
            });

    };
    console.log(formData)
    const handleOpen = (data: Donation) => {
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
                    createOneDonations(data: {
                          data: "${data}"
                          people: {
                            connect: {
                                id: ${people}
                            }
                          }
                          location: {
                            connect: {
                                id: ${collectionLocation}
                            }
                          }
                    }){
                      id
                      data
                      created_at
                      updated_at    
                    }
                  }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setData("");
                    setTrigger(true);
                    alert("Criado com sucesso");
                } else {
                    setData("Erro no cadastro");
                    alert("Erro no cadastro");
                }
            });
    }


    return (
        <div>
            <div>
                <h3>Cadastro de Doações</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="data">Data</label>
                        <input
                            type="date"
                            name="data"
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="people">Doador</label>
                        <select
                            name="people"
                            id="people"
                            onChange={(e) => setpeople(Number(e.target.value))}
                        >
                            {peoples.map((pep) => (
                                <option label={pep.document} value={pep.id}></option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="CollectionLocation">Local de coleta</label>
                        <select
                            name="CollectionLocation"
                            id="CollectionLocation"
                            onChange={(e) => setCollectionLocation(Number(e.target.value))}
                        >
                            {collectionLocations.map((loc) => (
                                <option label={loc.name} value={loc.id}></option>
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
                            <th>Data</th>
                            <th>Doador</th>
                            <th>Documento</th>
                            <th>Local de coleta</th>
                            <th>Rua</th>
                            <th>Criado</th>
                            <th>Alterado</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Donation.map((Donation) => (
                            <tr key={Donation.id}>
                                <td>{Donation.id}</td>
                                <td>{Donation.data}</td>
                                <td>{Donation.people.name}</td>
                                <td>{Donation.people.document}</td>
                                <td>{Donation.location.name}</td>
                                <td>{Donation.location.street}</td>
                                <td>{new Date(Donation.created_at).toLocaleDateString("pt-br")}</td>
                                <td>{new Date(Donation.updated_at).toLocaleDateString("pt-br")}</td>
                                <td><button onClick={(e) => {
                                    handleOpen({
                                        id: Donation.id,
                                        data: Donation.data
                                    })
                                }}>edit</button></td>
                                <td><button onClick={() => {
                                    api.post('', {
                                        query: `mutation {
                                                    deleteOneDonations(where: { id: ${Donation.id} }) {
                                                        id
                                                        data
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
            <AbstractModal<Donation>
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

export default Donations;
