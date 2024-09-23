import axios from "axios";

type dataSchema = {
    name: string;
    id: string;
    completed: boolean;
}[]

export async function postItems([{id, name, completed}]:dataSchema): Promise<void>{
    const data = {
        name,
        id,
        completed  
      };
    
    await axios.post('/api/items', data);
       
}