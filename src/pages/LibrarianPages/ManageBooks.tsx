import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { authFetch } from '../../Fetch/api';
import { toast } from 'sonner';

interface Book {
  id: number;
  title: string;
  authorId: number;
  isbn: string;
  genre: string;
  publishers: string;
  stock: number;
}

const ITEMS_PER_PAGE = 5;

const ManageBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Partial<Book>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');

  const fetchBooks = () => {
    fetch('https://localhost:7102/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => toast.error('Failed to load books'));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.authorId || !form.isbn || !form.genre || !form.publishers || form.stock === undefined) {
      toast.warning('Please fill all required fields.');
      return;
    }

    try {
      if (form.id) {
        await authFetch(`https://localhost:7102/api/books/${form.id}`, token, {
          method: 'PUT',
          body: JSON.stringify(form),
        });
        toast.success('Book updated successfully.');
      } else {
        await authFetch(`https://localhost:7102/api/books`, token, {
          method: 'POST',
          body: JSON.stringify(form),
        });
        toast.success('Book added successfully.');
      }
      setForm({});
      fetchBooks();
    } catch {
      toast.error('Operation failed. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authFetch(`https://localhost:7102/api/books/${id}`, token, {
        method: 'DELETE',
      });
      toast.success('Book deleted.');
      fetchBooks();
    } catch {
      toast.error('Delete failed.');
    }
  };

  const paginatedBooks = books.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581091226825-50f3b0c4b095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-6xl mx-auto animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700 animate-pulse">Manage Books</h2>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input
            placeholder="Author ID"
            type="number"
            value={form.authorId || ''}
            onChange={e => setForm({ ...form, authorId: Number(e.target.value) })}
          />
          <Input placeholder="ISBN" value={form.isbn || ''} onChange={e => setForm({ ...form, isbn: e.target.value })} />
          <Input placeholder="Genre" value={form.genre || ''} onChange={e => setForm({ ...form, genre: e.target.value })} />
          <Input placeholder="Publishers" value={form.publishers || ''} onChange={e => setForm({ ...form, publishers: e.target.value })} />
          <Input
            placeholder="Stock"
            type="number"
            value={form.stock || ''}
            onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
          />
        </div>

        <Button
          onClick={handleAddOrUpdate}
          className="mb-6 w-full md:w-auto transition duration-200 hover:scale-105"
        >
          {form.id ? 'Update Book' : 'Add Book'}
        </Button>

        {/* Table */}
        <div className="overflow-x-auto rounded-md shadow-md animate-fade-in">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-green-200 text-green-800">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Author ID</th>
                <th className="py-3 px-4 text-left">Genre</th>
                <th className="py-3 px-4 text-left">ISBN</th>
                <th className="py-3 px-4 text-left">Publishers</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map(book => (
                <tr key={book.id} className="border-b hover:bg-green-50 transition">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.authorId}</td>
                  <td className="py-2 px-4">{book.genre}</td>
                  <td className="py-2 px-4">{book.isbn}</td>
                  <td className="py-2 px-4">{book.publishers}</td>
                  <td className="py-2 px-4 text-center">{book.stock}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setForm(book)}
                      className="hover:scale-105 transition"
                    >
                      ✏️
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(book.id)}
                      className="hover:scale-105 transition"
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-full transition ${
                currentPage === index + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;


// import React, { useEffect, useState } from 'react';
// import { Input } from '../../components/ui/input';
// import { Button } from '../../components/ui/button';
// import { authFetch } from '../../Fetch/api';
// import { toast } from 'sonner';

// interface Book {
//     id: number;
//     title: string;
//     authorId: number;
//     isbn: string;
//     genre: string;
//     publishers: string;
//     stock: number;
// }

// const ITEMS_PER_PAGE = 5;

// const ManageBooks = () => {
//     const [books, setBooks] = useState<Book[]>([]);
//     const [form, setForm] = useState<Partial<Book>>({});
//     const [currentPage, setCurrentPage] = useState(1);
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         fetch("https://localhost:7102/api/books")
//             .then(res => res.json())
//             .then(data => setBooks(data));
//     }, []);

//     const handleAddOrUpdate = () => {
//         if (!form.title || !form.authorId || !form.isbn || !form.genre || !form.publishers || form.stock === undefined) {
//             toast.warning("Please fill all required fields.");
//             return;
//         }

//         if (form.id) {
//             authFetch(`https://localhost:7102/api/books/${form.id}`, token, {
//                 method: "PUT",
//                 body: JSON.stringify(form),
//             }).then(() => window.location.reload());
//         } else {
//             authFetch(`https://localhost:7102/api/books`, token, {
//                 method: "POST",
//                 body: JSON.stringify(form),
//             }).then(() => {
//                 toast.success("Book Added Successfully.");
//                 window.location.reload();
//             });
//         }
//     };

//     const handleDelete = (id: number) => {
//         authFetch(`https://localhost:7102/api/books/${id}`, token, {
//             method: "DELETE"
//         }).then(() => window.location.reload());
//     };

//     const paginatedBooks = books.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

//     return (
//         <div
//             className="min-h-screen bg-cover bg-center p-8"
//             style={{
//                 backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-50f3b0c4b095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
//             }}
//         >
//             <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-6xl mx-auto">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Manage Books</h2>

//                 {/* Horizontal Form */}
//                 <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
//                     <Input placeholder="Title" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
//                     <Input placeholder="Author ID" type="number" value={form.authorId || ""} onChange={e => setForm({ ...form, authorId: Number(e.target.value) })} />
//                     <Input placeholder="ISBN" value={form.isbn || ""} onChange={e => setForm({ ...form, isbn: e.target.value })} />
//                     <Input placeholder="Genre" value={form.genre || ""} onChange={e => setForm({ ...form, genre: e.target.value })} />
//                     <Input placeholder="Publishers" value={form.publishers || ""} onChange={e => setForm({ ...form, publishers: e.target.value })} />
//                     <Input placeholder="Stock" type="number" value={form.stock || ""} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
//                 </div>

//                 <Button onClick={handleAddOrUpdate} className="mb-6 w-full md:w-auto">
//                     {form.id ? "Update Book" : "Add Book"}
//                 </Button>

//                 {/* Books Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                             <tr className="bg-green-200 text-green-800">
//                                 <th className="py-3 px-4 text-left">Title</th>
//                                 <th className="py-3 px-4 text-left">Author ID</th>
//                                 <th className="py-3 px-4 text-left">Genre</th>
//                                 <th className="py-3 px-4 text-left">ISBN</th>
//                                 <th className="py-3 px-4 text-left">Publishers</th>
//                                 <th className="py-3 px-4 text-center">Stock</th>
//                                 <th className="py-3 px-4 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedBooks.map(book => (
//                                 <tr key={book.id} className="border-b hover:bg-green-50 transition">
//                                     <td className="py-2 px-4">{book.title}</td>
//                                     <td className="py-2 px-4">{book.authorId}</td>
//                                     <td className="py-2 px-4">{book.genre}</td>
//                                     <td className="py-2 px-4">{book.isbn}</td>
//                                     <td className="py-2 px-4">{book.publishers}</td>
//                                     <td className="py-2 px-4 text-center">{book.stock}</td>
//                                     <td className="py-2 px-4 flex justify-center gap-2">
//                                         <Button size="sm" onClick={() => setForm(book)}>✏️</Button>
//                                         <Button size="sm" variant="destructive" onClick={() => handleDelete(book.id)}>🗑️</Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex justify-center mt-6 gap-2">
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageBooks;

// import React, { useEffect, useState } from 'react'
// import { Input } from '../../components/ui/input';
// import { Button } from '../../components/ui/button';
// import { authFetch } from '../../Fetch/api';
// import { toast } from 'sonner';

// interface Book {
//     id:number;
//     title : string;
//     authorId : number;
//     isbn:string;
//     genre:string;
//     publishers:string;
//     stock:number;
// }
// const ManageBooks = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [form, setForm] = useState<Partial<Book>>({});
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     fetch("https://localhost:7102/api/books")
//       .then(res => res.json())
//       .then(data => setBooks(data));
//   }, []);

//   const handleAddOrUpdate = () => {
//     if(Object.keys(form).length === 0)
//     {
//       toast.warning("Please Enter the required details")
//       return;
//     }
//     console.log(form);
//     try{
//       if (form.id) {
//         const bookId = Number(form.id)
//       // Update book
//       authFetch(`https://localhost:7102/api/books/${bookId}`, token,{
//         method: "PUT",
//         body: JSON.stringify(form),
//       }).then(() => window.location.reload());
//     } else {
//       // Add book
//       authFetch(`https://localhost:7102/api/books`, token,{
//         method: "POST",
//         body: JSON.stringify(form),
//       }).then(() => window.location.reload());
//       toast.success("Book Added Successfully.")
//     }

//     }
//     catch(err)
//     {
//       console.log(err);
//       toast.error("An Error occured.")
//     }
    
//   };

//   const handleDelete = (id: number) => {
//     authFetch(`https://localhost:7102/api/books/${id}`, token,{ method: "DELETE" }).then(() => window.location.reload());
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
//       <div className="grid gap-2 mb-4">
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Title</label>
//         <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required/>
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Author ID</label>
//         <Input placeholder="Author ID" type="number" value={form.authorId} onChange={e => setForm({ ...form, authorId: Number(e.target.value) })} required/>
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>ISBN</label>
//         <Input placeholder="ISBN" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} required/>
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Genre</label>
//         <Input placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} required/>
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Publishers</label>
//         <Input placeholder="Publishers" value={form.publishers} onChange={e => setForm({ ...form, publishers: e.target.value })} required/>
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Stock</label>
//         <Input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} required/>
//         <Button onClick={handleAddOrUpdate}>{form.id ? "Update" : "Add"} Book</Button>
//       </div>

//       <div className="space-y-2">
//         {books.map(book => (
//           <div key={book.id} className="p-4 bg-gray-100 rounded shadow flex justify-between">
//             <div>
//               <h3 className="font-bold">Title : {book.title}</h3>
//               <p>BookId : {book.id} | Genre: {book.genre} | Stock: {book.stock}</p>
//             </div>
//             <div className="space-x-2">
//               <Button size="sm" onClick={() => setForm(book)}>Edit</Button>
//               <Button size="sm" variant="destructive" onClick={() => handleDelete(book.id)}>Delete</Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageBooks;