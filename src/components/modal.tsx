
import { HtmlHTMLAttributes } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const taskSchema = z.object({
  name: z.string().min(1, "A tarefa não pode estar vazia"),
});

type DataSchema = z.infer<typeof taskSchema>;

export function Modal() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataSchema>({
    resolver: zodResolver(taskSchema),
  });

  async function onSubmit( { name }: DataSchema){
    const newItem = {
      name,
      id: uuid(),
      completed: false  
    };

    try {
      const response = await axios.post('/api/items', newItem);
      window.location.reload();

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Erro ao criar item');
      }

      reset(); 
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <Dialog.Content>
      <Dialog.Title>Criar nova tarefa</Dialog.Title>
      <Dialog.Description>Criar nova tarefa</Dialog.Description>
      
        <Dialog.Overlay className="fixed inset-0 bg-white opacity-95 flex flex-1 flex-col items-center justify-center ">
          <div  className="max-w-[400px] w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4  ">
            <h1 className='text-center mb-3 text-gray-500'>Criar nova tarefa</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='z-10'>
              <input
                className={`text-black mb-3 w-full p-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-[#ccc]'} focus:outline-none focus:border-[#6e7f80]`}
                type="text"
                autoFocus
                {...register("name")}
                placeholder="Criar nova tarefa"
              />
              {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}
              <div className='flex justify-between items-center space-x-4'>
                <Dialog.Close asChild>
                  <button type='button' className="bg-cancelar border-none text-black py-3 px-5 rounded-md cursor-pointer w-full">Cancelar</button>
                </Dialog.Close>
                <button type="submit" className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer w-full">
                  Adicionar
                </button>
              </div>
            </form>
          </div>


        </Dialog.Overlay>
      
    </Dialog.Content>
  );
}
