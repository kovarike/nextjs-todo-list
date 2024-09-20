import axios from "axios";

type dataSchema = {
    name: string;
    id: string;
    completed: boolean;
}[]

export async function postItems(newItem:dataSchema): Promise<void>{
    await axios.post('/api/items', newItem);
   
}