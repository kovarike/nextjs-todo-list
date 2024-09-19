"use client";
import { HtmlHTMLAttributes } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const taskSchema = z.object({
  name: z.string().min(1, "A tarefa não pode estar vazia"),
});

type DataSchema = z.infer<typeof taskSchema>;

export function Modal() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: DataSchema) => {
    const newItem = {
      name: data.name,
      id: uuid(), // Gera um UUID aqui
    };

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar item');
      }

      reset(); // Limpa o formulário após sucesso
    } catch (error) {
      console.error(error);
      // Aqui você pode mostrar uma mensagem de erro ao usuário, se necessário
    }
  };

  return (
    <Dialog.Content>
      <Dialog.Title>Criar nova tarefa</Dialog.Title>
      <Dialog.Description>Criar nova tarefa</Dialog.Description>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-80 z-10">
          <div  className="max-w-[400px] w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4 mt-10">
            <h1 className='text-center mb-3 text-gray-500'>Criar nova tarefa</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
      </Dialog.Portal>
    </Dialog.Content>
  );
}
