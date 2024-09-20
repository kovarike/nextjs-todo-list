"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/modal";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

type dataSchema = {
  name: string;
  id: string;
  completed: boolean;
};

export default function Home() {
  const [items, setItems] = useState<dataSchema[]>([]);

  // Carrega as tarefas ao iniciar o componente
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get("/api/items");
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Erro ao buscar itens");
        }
        const data = await response.data;
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    getItems();
  }, []);

  // Função para deletar uma tarefa
  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`/api/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar item", error);
    }
  };

  // Função para marcar/desmarcar uma tarefa como finalizada
  const toggleCompleted = async (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);

    try {
      await axios.put(`/api/items/${id}`, {
        completed: !items.find((item) => item.id === id)?.completed,
      });
    } catch (error) {
      console.error("Erro ao atualizar item", error);
    }
  };

  return (
    <Dialog.Root>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[400px] w-[400px] p-5 mx-auto shadow-lg bg-white rounded-xl space-y-4">
          <h1 className="text-center mb-3 text-gray-500">Suas tarefas de hoje</h1>

          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  item.completed ? "bg-gray-100 line-through" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleCompleted(item.id)}
                    className="form-checkbox"
                  />
                  <span className={`text-sm ${item.completed ? "text-gray-400" : "text-gray-700"}`}>
                    {item.name}
                  </span>
                </div>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteItem(item.id)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          <Dialog.Trigger asChild>
            <button className="bg-blue-500 text-white py-3 px-5 rounded-md cursor-pointer w-full">
              Adicionar nova tarefa
            </button>
          </Dialog.Trigger>
        </div>
      </div>

      {/* Componente Modal para adicionar tarefas */}
      <Modal />
    </Dialog.Root>
  );
}


/////////////////


import { useState } from "react";
import axios from "axios";

export const Modal = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;

    try {
      await axios.post("/api/items", { name, completed: false });
      setName(""); // Limpa o campo após o envio
      window.location.reload(); // Recarrega a página para exibir a nova tarefa
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
    }
  };

  return (
    <div>
      <div className="modal-content">
        <h2>Adicionar Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Nome da tarefa"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};
