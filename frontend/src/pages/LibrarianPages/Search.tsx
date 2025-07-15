import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { authFetch } from "../../Fetch/api";
import {toast} from 'sonner';

type Author = {
  id: number;
  name: string;
  bio: string;
};
type Book = {
  id: number;
  title: string;
  authorId: number;
  isbn: string;
  genre: string;
  publishers: string;
  stock: number;
};
type User = {
  id: number;
  username: string;
  email: string;
  phone:string;
  address: string;
};
type SearchResultDTO ={
    authorS:Author[],
    bookS:Book[],
    userS:User[]
}
const Search: React.FC = () => {
  const [query, setQuery] = useState("");
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [type, setType] = useState("");
    const [result,setResult]=useState<SearchResultDTO | null>(null);

  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if(!query.trim())
    {
      toast.warning("Search is Invalid")
      return;
    }
    try{
      console.log(query)
    await authFetch(`https://localhost:7102/api/UserAuth/search-all?query=${query}`, token, {
      method: "GET",
    }).then(res=>res.json())
      .then(data=>setResult(data));

    console.log(result)

    setQuery('')
    }
    catch(err)
    {
      console.log(err);
      toast.error("An error occured while searching");
    }
    
    
  };
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl mb-6 font-bold text-center">Library Search</h1>
      <div className="flex gap-4 mb-8 justify-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Authors, Books, Users here by name..."
          className="p-2 border rounded w-1/3"
          required
        ></Input>
        <Button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </Button>
      </div>
      {
        result && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{result.authorS.map(author=>(
            <div key={author.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold">{author.name}</h3>
              <p><strong>Author Id: </strong>{author.id}</p>
              <p><strong>Author Bio: </strong>{author.bio}</p>
            </div>

          ))}
          {
            result.bookS.map(book=>(
                <div key={book.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">Book : {book.title}</h3>
                    <p><strong>Book Id: </strong>{book.id}</p>
                    <p><strong>Author Id: </strong>{book.authorId}</p>
                    <p><strong>ISBN: </strong>{book.isbn}</p>
                    <p><strong>Genre: </strong>{book.genre}</p>
                    <p><strong>Publishers: </strong>{book.publishers}</p>
                    <p><strong>Stock: </strong>{book.stock}</p>
                </div>
            ))
          }
          {
            result !=null && result.authorS.map(author=>(
                <div key={author.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">Author : {author.name}</h3>
                    <p><strong>Author Id: </strong>{author.id}</p>
                    <p><strong>Author Bio: </strong>{author.bio}</p>
                  
                </div>
            ))
           
          }
          </div>
        )
      }
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            result !=null && result.userS.map(user=>(
                <div key={user.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">User : {user.username}</h3>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Phone: </strong>{user.phone}</p>
                    <p><strong>Address: </strong>{user.address}</p>
                </div>
            ))
        }
        {
            result !=null && result.bookS.map(book=>(
                <div key={book.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">Book : {book.title}</h3>
                    <p><strong>Book Id: </strong>{book.id}</p>
                    <p><strong>Author Id: </strong>{book.authorId}</p>
                    <p><strong>ISBN: </strong>{book.isbn}</p>
                    <p><strong>Genre: </strong>{book.genre}</p>
                    <p><strong>Publishers: </strong>{book.publishers}</p>
                    <p><strong>Stock: </strong>{book.stock}</p>
                </div>
            ))
        }
        {
            result !=null && result.authorS.map(author=>(
                <div key={author.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">Author : {author.name}</h3>
                    <p><strong>Author Id: </strong>{author.id}</p>
                    <p><strong>Author Bio: </strong>{author.bio}</p>
                  
                </div>
            ))
        } */}
        {!result && <p className="text-center text-gray-500 mt-6">No Search Results yet...</p>}
     
       

      </div>
    // </div>
  );
};

export default Search;
