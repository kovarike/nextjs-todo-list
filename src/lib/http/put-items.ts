import axios from "axios";

type dataSchema = {
    name?: string;
    id?: string;
    completed?: boolean;
}[]

export async function putItems([{id, name, completed}]: dataSchema, idItems: string ): Promise<void>{
  const data = {
    name,
    id,
    completed
  };
  if(!data){return alert("error ao concluir atrefa")}
    
  await axios.put(`/api/items?id=${idItems}`, data);
     
}