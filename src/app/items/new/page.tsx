"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../style.module.css';

const NewItem = () => {
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
    <div className={styles.container}>
      <h1>Create New Item</h1>
      <form onSubmit={handleSubmit}>
        <input
        className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Item name"
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
    </div>
  );
};

export default NewItem;
