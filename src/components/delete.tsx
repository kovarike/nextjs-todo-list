import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

interface PropsDelete {
  id: string;
}

export function Delete({ id }: PropsDelete) {
  async function deleteItem(id: string) {
    try {
      const res = await axios.delete(`/api/items?id=${id}`);
      console.log(res.data);
      window.location.reload(); 
    } catch (error) {
      console.error('Erro ao deletar item', error);
    }
  }

  return (
    <Dialog.Content>
      <Dialog.Title>Deletar tarefa</Dialog.Title>
      <Dialog.Description>Tem certeza que deseja deletar esta tarefa?</Dialog.Description>

      <Dialog.Overlay className="fixed inset-0 bg-white opacity-95 flex items-center justify-center">
        <div className="max-w-[400px] w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4">
          <h1 className="text-center mb-3 text-black text-xl">Deletar tarefa</h1>
          <h2 className="text-center mb-3 text-gray-500 text-base">
            Tem certeza que você deseja deletar essa tarefa?
          </h2>
          <div className="flex justify-between items-center space-x-4">
            <Dialog.Close asChild>
              <button type="button" className="bg-gray-200 text-black py-3 px-5 rounded-md w-full">
                Cancelar
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => deleteItem(id)}
              className="bg-red-500 text-white py-3 px-5 rounded-md w-full"
            >
              Deletar
            </button>
          </div>
        </div>
      </Dialog.Overlay>
    </Dialog.Content>
  );
}
