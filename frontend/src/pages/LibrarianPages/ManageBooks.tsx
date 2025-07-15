import React, { useEffect, useState } from 'react'
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { authFetch } from '../../Fetch/api';
import { toast } from 'sonner';

interface Book {
    id:number;
    title : string;
    authorId : number;
    isbn:string;
    genre:string;
    publishers:string;
    stock:number;
}
const ManageBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Partial<Book>>({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("https://localhost:7102/api/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleAddOrUpdate = () => {
    if(Object.keys(form).length === 0)
    {
      toast.warning("Please Enter the required details")
      return;
    }
    console.log(form);
    try{
      if (form.id) {
        const bookId = Number(form.id)
      // Update book
      authFetch(`https://localhost:7102/api/books/${bookId}`, token,{
        method: "PUT",
        body: JSON.stringify(form),
      }).then(() => window.location.reload());
    } else {
      // Add book
      authFetch(`https://localhost:7102/api/books`, token,{
        method: "POST",
        body: JSON.stringify(form),
      }).then(() => window.location.reload());
      toast.success("Book Added Successfully.")
    }

    }
    catch(err)
    {
      console.log(err);
      toast.error("An Error occured.")
    }
    
  };

  const handleDelete = (id: number) => {
    authFetch(`https://localhost:7102/api/books/${id}`, token,{ method: "DELETE" }).then(() => window.location.reload());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
      <div className="grid gap-2 mb-4">
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Title</label>
        <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required/>
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Author ID</label>
        <Input placeholder="Author ID" type="number" value={form.authorId} onChange={e => setForm({ ...form, authorId: Number(e.target.value) })} required/>
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>ISBN</label>
        <Input placeholder="ISBN" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} required/>
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Genre</label>
        <Input placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} required/>
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Publishers</label>
        <Input placeholder="Publishers" value={form.publishers} onChange={e => setForm({ ...form, publishers: e.target.value })} required/>
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Stock</label>
        <Input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} required/>
        <Button onClick={handleAddOrUpdate}>{form.id ? "Update" : "Add"} Book</Button>
      </div>

      <div className="space-y-2">
        {books.map(book => (
          <div key={book.id} className="p-4 bg-gray-100 rounded shadow flex justify-between">
            <div>
              <h3 className="font-bold">Title : {book.title}</h3>
              <p>BookId : {book.id} | Genre: {book.genre} | Stock: {book.stock}</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" onClick={() => setForm(book)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(book.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
