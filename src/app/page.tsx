"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from '@/components/modal';
import { Delete } from '@/components/delete';

type dataSchema = {
  name: string;
  id: string;
  completed: boolean;
}

export default function Home() {
  const [items, setItems] = useState<dataSchema[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getItems();
  }, []);

  const toggleCompleted = async (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);

    try {
      await axios.put(`/api/items?id=${id}`, {
        completed: !items.find((item) => item.id === id)?.completed
      });
    } catch (error) {
      console.error("Erro ao atualizar item", error);
    }
  };

  return (
    <Dialog.Root>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[400px] w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4 flex flex-col justify-center items-center">
          <h1 className='text-center mb-3 text-gray-500'>Suas tarefas de hoje</h1>
          <ul className='space-y-3 w-full'>
            {items.map((item) => (
              
                <li
                  key={item.id}
                  className={`flex justify-between items-center p-4 rounded-lg ${
                    item.completed ? 'bg-gray-100 line-through' : 'bg-gray-50'
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
