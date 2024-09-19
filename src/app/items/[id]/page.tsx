"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../style.module.css';

const ItemDetail = ({ params }: { params: { id: string } }) => {
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchItem = () => {
      const items = JSON.parse(localStorage.getItem('items') || '[]');
      const foundItem = items.find((item: any) => item.id === parseInt(params.id));
      setItem(foundItem);
      setName(foundItem?.name);
    };
    fetchItem();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const updatedItems = items.map((item: any) => {
      if (item.id === parseInt(params.id)) {
        return { ...item, name };
      }
      return item;
    });
    localStorage.setItem('items', JSON.stringify(updatedItems));
    router.push('/');
  };

  const handleDelete = () => {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const filteredItems = items.filter((item: any) => item.id !== parseInt(params.id));
    localStorage.setItem('items', JSON.stringify(filteredItems));
    router.push('/');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Edit Item</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
      <button onClick={handleDelete} className={styles.button}>
        Delete
      </button>
    </div>
  );
};

export default ItemDetail;
