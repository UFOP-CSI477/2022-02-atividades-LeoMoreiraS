import { useState } from "react"
import api from "../../services/api";



const CreateState = () =>{
    
    const [name, setName] = useState<string>('');
    const [acronym, setAcronym] = useState<string>('');
    function handleSubmit(event:any){
        event.preventDefault();
        api.post('', {query:`
            mutation    {
                createOneStates(data: {
                      name: "${name}"
                      acronym: "${acronym}"
                }){
                  id
                  name
                  acronym
                  state{
                    id
                    name
                    acronym
                  }
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
                Cadastro de Estados
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
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateState