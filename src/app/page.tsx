"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from '@/components/modal';





type dataSchema = {
  name: string;
  id: string;
}

export default function Home() {
  const [items, setItems] = useState<dataSchema[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Erro ao buscar itens');
        }
        const data =  await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    getItems();
  }, []);



  return (
    <Dialog.Root>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4">
          <h1 className='text-center mb-3 text-gray-500'>Suas tarefas de hoje</h1>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link href={`/items/${item.id}`} className="text-blue-600 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Dialog.Trigger asChild>
            <button className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer text-center">
              Adicionar nova tarefa
            </button>
          </Dialog.Trigger>
        </div>
      </div>
      <Modal/>

    </Dialog.Root>
  );
}
