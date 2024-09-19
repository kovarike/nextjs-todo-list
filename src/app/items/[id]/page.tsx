"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


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
    <div className="max-w-[400px] p-5 mx-auto shadow-shadow bg-white rounded-xl space-y-4 flex flex-1 flex-col items-center mt-6">
      <h1>Edit Item</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          className='mb-3 w-full p-[10px] rounded-md border-[1px] border-[#ccc] focus:outline-none focus:border-[#6e7f80]'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="bg-button border-none text-white py-3 px-5 rounded-md cursor-pointer text-center mx-auto ">
          Update
        </button>
      </form>
      <button onClick={handleDelete} className="bg-delete border-none text-white py-3 px-5 rounded-md cursor-pointer text-center mx-auto ">
        Delete
      </button>
    </div>
  );
};

export default ItemDetail;
