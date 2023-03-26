import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AbstractModal from "../modal/AbstractModal";

interface IStates {
    id: number;
    name: string;
    acronym: string;
    created_at: string;
    updated_at: string;
}
type State = {
    id: number,
    name: string,
    acronym: string,
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

const States = () => {
    const [trigger, setTrigger] = useState<Boolean>(false)
    const [States, setStates] = useState<IStates[]>([]);

    useEffect(() => {
        api.post("", getStatesQuery).then((response) => {
            const { findManyStates } = response.data.data;
            setStates(findManyStates.sort((a:IStates,b:IStates)=>(a.id-b.id)));
            if(trigger)
                setTrigger(false);
        });
    }, [trigger]);


    const [name, setName] = useState<string>("");
    const [acronym, setAcronym] = useState<string>("");


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<State>({
        name: "",
        id: 0,
        acronym: "",
    });



    const handleSubmitModal = () => {
        api
            .post("", {
                query: `
        mutation {
            updateOneStates(
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
    const handleOpen = (data: State) => {
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
                createOneStates(data: {
                      name: "${name}"
                      acronym: "${acronym.toLocaleUpperCase()}"
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
                <h3>Cadastro de Estados</h3>
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
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </form>
            </div>

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
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {States.map((State) => (
                            <tr key={State.id}>
                                <td>{State.id}</td>
                                <td>{State.name}</td>
                                <td>{State.acronym}</td>
                                <td>{new Date(State.created_at).toLocaleDateString("pt-br")}</td>
                                <td>{new Date(State.updated_at).toLocaleDateString("pt-br")}</td>
                                <td><button onClick={(e) => { handleOpen({ name: State.name, acronym: State.acronym, id: State.id }) }}>edit</button></td>
                                <td><button onClick={() => {
                                    api.post('', {
                                        query: `mutation {
                                                    deleteOneStates(where: { id: ${State.id} }) {
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
            <AbstractModal<State>
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

export default States;
