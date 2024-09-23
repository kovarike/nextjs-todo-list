import axios from "axios";



export async function deleteItems(id: string ): Promise<void>{
    
    
    await axios.delete(`/api/items?id=${id}`);
     
}