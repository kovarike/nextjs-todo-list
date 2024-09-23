import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { postItems } from '@/lib/http/post-items';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import * as Dialog from '@radix-ui/react-dialog';

const taskSchema = z.object({
  name: z.string().min(1, "A tarefa não pode estar vazia"),
});

type DataSchema = z.infer<typeof taskSchema>;

export function Modal() {
  const useClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataSchema>({
    resolver: zodResolver(taskSchema),
  });

  async function onSubmit({ name }: DataSchema) {
    await postItems([{
      name,
      id: uuid(),
      completed: false
    }]);

    reset();
    useClient.invalidateQueries({ queryKey: ["items"] });
  };

  return (
    <Dialog.Content>
      <Dialog.Title className="text-lg font-medium">Criar nova tarefa</Dialog.Title>
      <Dialog.Description className="mb-4">Preencha o campo abaixo para adicionar uma nova tarefa.</Dialog.Description>
      
      <Dialog.Overlay className="fixed inset-0 bg-white opacity-95 flex flex-1 flex-col items-center justify-center">
        <div className="max-w-[450px] w-full p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4">
          <h1 className='text-center mb-3 text-gray-500 text-lg'>Criar nova tarefa</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={`text-black mb-3 w-full p-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-[#ccc]'} focus:outline-none focus:border-[#6e7f80]`}
              type="text"
              autoFocus
              autoComplete='off'
              {...register("name")}
              placeholder="Criar nova tarefa"
            />
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}
            <div className='flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4'>
              <Dialog.Close asChild>
                <button type='button' className="bg-cancelar border-none text-black py-3 px-5 rounded-md cursor-pointer w-full sm:w-auto">Cancelar</button>
              </Dialog.Close>
              <button type="submit" className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer w-full sm:w-auto">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </Dialog.Overlay>
      
    </Dialog.Content>
  );
}

