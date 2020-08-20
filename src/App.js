import React, {useState, useEffect}from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
  api.get('repositories').then((response)=>{
      setRepositories(response.data);
  });
  }
  ,[])

   async function handleAddRepository() {
    // TODO
   
    const response = await api.post('repositories')
    const repositore = response.data;
     setRepositories([...repositories, repositore])
  }

  async function handleRemoveRepository(id) {
    // TODO
      await api.delete(`repositories/${id}`)

      setRepositories( repositories.filter( repositore => repositore.id !== id ));         
    
  }

  return (
    <>    
      <ul data-testid="repository-list"> 
          {
           repositories.map(({id,title,techs,url}) => (
           <li key={id}>
             {title}
           <button onClick={() => handleRemoveRepository(id)}>
             Remover
             </button>
             </li>
             )
             )
          }  
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>    
    </>
  );
}

export default App;
