import { deleteItems } from '@/lib/http/delet-item';
import * as Dialog from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';

interface PropsDelete {
  id: string;
}

export function Delete({ id }: PropsDelete) {
  const useClient = useQueryClient();

  async function DeleteId(id: string) {
    await deleteItems(id);
    useClient.invalidateQueries({ queryKey: ["items"] });
  }

  return (
    <Dialog.Content>
      <Dialog.Title className="text-lg font-medium">Deletar tarefa</Dialog.Title>
      <Dialog.Description className="mb-4">Tem certeza que deseja deletar esta tarefa?</Dialog.Description>

      <Dialog.Overlay className="fixed inset-0 bg-[#E3F2FD] bg-opacity-95 flex items-center justify-center">
        <div className="max-w-[450px] w-full p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4">
          <h1 className="text-center mb-3 text-black text-xl font-medium">Deletar tarefa</h1>
          <h2 className="text-center mb-3 text-gray-500 text-base">
            Tem certeza que você deseja deletar essa tarefa?
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Dialog.Close asChild>
              <button type="button" className="bg-gray-200 text-black py-3 px-5 rounded-md w-full sm:w-auto">
                Cancelar
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => DeleteId(id)}
              className="bg-red-500 text-white py-3 px-5 rounded-md w-full sm:w-auto"
            >
              Deletar
            </button>
          </div>
        </div>
      </Dialog.Overlay>
    </Dialog.Content>
  );
}

