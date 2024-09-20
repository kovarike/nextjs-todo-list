"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from '@/components/modal';
import { Delete } from '@/components/delete';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { getItems } from '@/app/api/http/get-items';


type dataSchema = {
  name: string;
  id: string;
  completed: boolean;
}

const queryClient = new QueryClient();

export function HomePage() {
  const { data  } = useQuery({
    queryKey:['items'], queryFn: getItems, staleTime: 1000 * 60,   
  });
  if(!data){return}


 
  const toggleCompleted = async (id: string) => {
    // const updatedItems = data.map((item) =>
    //   item.id === id ? { ...item, completed: !item.completed } : item
    // );
    

    const newItem = {
      name: data.find((item) => item.id === id)?.name,
      id: data.find((item) => item.id === id)?.id,
      completed: !data.find((item) => item.id === id)?.completed
    };

    try {
      await axios.put(`/api/items?id=${id}`, newItem);
    } catch (error) {
      console.error("Erro ao atualizar item", error);
    }
    queryClient.invalidateQueries({queryKey: ["items"]})
    window.location.reload();
  };

  return (

    <Dialog.Root>

      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="max-w-[400px] w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4 flex flex-col justify-center items-center ">
          <h1 className='text-center mb-3 text-gray-500'>Suas tarefas de hoje</h1>
          <ul className='space-y-3 w-full overflow-y-scroll max-h-[500px] h-[500px]'>
            {data.map((item) => (
              <div key={item.id} className='w-full'>
                 <li
                
                className={`flex justify-between items-center p-4 rounded-lg ${item.completed ? 'bg-gray-100 line-through' : 'bg-gray-50'
                  }`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleCompleted(item.id)}
                    className="form-checkbox"
                  />
                  <span className={`text-sm ${item.completed ? 'text-gray-400' : 'text-gray-700'}`}>
                    {item.name}
                  </span>
                </div>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash />
                    </button>
                  </Dialog.Trigger>
                  <Delete id={item.id} />
                </Dialog.Root>
              </li>
            
              </div>
             
              

            ))}
          </ul>
          <Dialog.Trigger asChild>
            <button className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer text-center mx-auto w-full">
              Adicionar nova tarefa
            </button>
          </Dialog.Trigger>
        </div>
      </div>
      <Modal />
    </Dialog.Root>

  );
}
