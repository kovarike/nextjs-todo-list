"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

export default function Home(){
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="max-w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4 flex flex-1 flex-col items-center mt-6">
      <h1 className='mx-auto text-center mb-3'>Suas tarefas de hoje</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Link  href="/items/new" className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer text-center mx-auto ">
        Adicionar nova tarefa
      </Link>

    </div>
  );
};


