import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AbstractModal from "../modal/AbstractModal";

interface IBloodTypes {
    id: number;
    type: string;
    factor: string;
    created_at: string;
    updated_at: string;
}
type BloodType = {
    id: number,
    type: string,
    factor: string,
}


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

const BloodTypes = () => {
    const [trigger, setTrigger] = useState<Boolean>(false)
    const [BloodTypes, setBloodTypes] = useState<IBloodTypes[]>([]);

    useEffect(() => {
        api.post("", getBloodTypeQuery).then((response) => {
            const { bloodTypes } = response.data.data;
            setBloodTypes(bloodTypes.sort((a:IBloodTypes,b:IBloodTypes)=>(a.id-b.id)));
            if(trigger)
                setTrigger(false);
        });
    }, [trigger]);


    const [factor, setFactor] = useState<string>("");
    const [type, setType] = useState<string>("");


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<BloodType>({
        factor: "",
        id: 0,
        type: "",
    });



    const handleSubmitModal = () => {
        api
            .post("", {
                query: `
        mutation {
            updateOneBloodType(
              where: { id: ${formData.id} }
              data: {
                factor: {set: "${formData.factor}"}
                type: {set: "${formData.type}"}
              }
            ) {
              id
              factor
              type
            }
          }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setFactor("");
                    setType("");
                    setTrigger(true);
                    alert("Atualizado com sucesso");
                } else {
                    setFactor("Erro na atualização");
                    setType("Erro na atualização");
                    alert("Erro na atualização");
                }
            });

    };
    console.log(formData)
    const handleOpen = (data: BloodType) => {
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
                mutation {
                    createOneBloodType(
                      data: {
                        type: "${type}"
                        factor: "${factor}"
                      }
                    ) {
                      id
                      type
                      factor
                      updated_at
                      created_at    
                    }
                  }`,
            })
            .then((response) => {
                if (response.status === 200) {
                    setFactor("");
                    setType("");
                    setTrigger(true);
                    alert("Criado com sucesso");
                } else {
                    setFactor("Erro no cadastro");
                    setType("Erro no cadastro");
                    alert("Erro no cadastro");
                }
            });
    }


    return (
        <div>
            <div>
                <h3>Cadastro de Tipo Sanguíneo</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="factor">Fator</label>
                        <input
                            type="text"
                            name="factor"
                            id="factor"
                            value={factor}
                            onChange={(e) => setFactor(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="acronym">Tipo</label>
                        <input
                            type="text"
                            name="acronym"
                            id="acronym"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </form>
            </div>

            <div>
                <h2>Lista de Tipo Sanguíneo</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fator</th>
                            <th>Tipo</th>
                            <th>Criado</th>
                            <th>Alterado</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {BloodTypes.map((BloodType) => (
                            <tr key={BloodType.id}>
                                <td>{BloodType.id}</td>
                                <td>{BloodType.factor}</td>
                                <td>{BloodType.type}</td>
                                <td>{new Date(BloodType.created_at).toLocaleDateString("pt-br")}</td>
                                <td>{new Date(BloodType.updated_at).toLocaleDateString("pt-br")}</td>
                                <td><button onClick={(e) => { handleOpen({ factor: BloodType.factor, type: BloodType.type, id: BloodType.id }) }}>edit</button></td>
                                <td><button onClick={() => {
                                    api.post('', {
                                        query: `mutation {
                                                    deleteOneBloodType(where: { id: ${BloodType.id} }) {
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
            <AbstractModal<BloodType>
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

export default BloodTypes;
