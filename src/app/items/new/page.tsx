"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/modal';


export default function NewItem () {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Date.now(), name }),
    });
    if (response.ok) {
      router.push('/');
    }
  };

  return (
    
      <div className="max-w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4 flex flex-1 flex-col items-center mt-6">
        <h1 className='mx-auto text-center mb-3 text-gray-500'>Criar nova tarefa</h1>
        <form onSubmit={handleSubmit}>
          <input
          className="mb-3 w-full p-[10px] rounded-md border-[1px] border-[#ccc] focus:outline-none focus:border-[#6e7f80]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Criar nova tarefa"
          />
          <button type="submit" className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer text-center mx-auto">
            Adicionar
          </button>
        </form>
      </div>
    
  );
};


