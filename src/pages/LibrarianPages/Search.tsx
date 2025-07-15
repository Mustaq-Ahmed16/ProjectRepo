import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { authFetch } from "../../Fetch/api";
import { toast } from "sonner";

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
  phone: string;
  address: string;
};
type SearchResultDTO = {
  authorS: Author[];
  bookS: Book[];
  userS: User[];
};

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResultDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.warning("Search is invalid.");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch(
        `https://localhost:7102/api/UserAuth/search-all?query=${query}`,
        token,
        { method: "GET" }
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while searching.");
    }
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">🔍 Library Search</h1>

      {/* Search Bar */}
      <div className="flex justify-center gap-4 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search authors, books, or users by name..."
          className="w-1/2 shadow-md"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Search Results */}
      {result ? (
        <div className="space-y-10">
          {/* Authors */}
          {result.authorS.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">👩‍💼 Authors</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.authorS.map((author) => (
                  <div
                    key={author.id}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-xl transition"
                  >
                    <h3 className="font-bold text-lg text-purple-700">{author.name}</h3>
                    <p><strong>ID:</strong> {author.id}</p>
                    <p><strong>Bio:</strong> {author.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books */}
          {result.bookS.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">📚 Books</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.bookS.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-xl transition"
                  >
                    <h3 className="font-bold text-lg text-blue-700">{book.title}</h3>
                    <p><strong>ID:</strong> {book.id}</p>
                    <p><strong>Author ID:</strong> {book.authorId}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Publisher:</strong> {book.publishers}</p>
                    <p><strong>Stock:</strong> {book.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {result.userS.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">👤 Users</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.userS.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-xl transition"
                  >
                    <h3 className="font-bold text-lg text-green-700">{user.username}</h3>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.authorS.length === 0 &&
           result.bookS.length === 0 &&
           result.userS.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No matching records found.
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No search results yet...</p>
      )}
    </div>
  );
};

export default Search;



// import React, { useState } from "react";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { authFetch } from "../../Fetch/api";
// import {toast} from 'sonner';

// type Author = {
//   id: number;
//   name: string;
//   bio: string;
// };
// type Book = {
//   id: number;
//   title: string;
//   authorId: number;
//   isbn: string;
//   genre: string;
//   publishers: string;
//   stock: number;
// };
// type User = {
//   id: number;
//   username: string;
//   email: string;
//   phone:string;
//   address: string;
// };
// type SearchResultDTO ={
//     authorS:Author[],
//     bookS:Book[],
//     userS:User[]
// }
// const Search: React.FC = () => {
//   const [query, setQuery] = useState("");
// //   const [authors, setAuthors] = useState<Author[]>([]);
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [type, setType] = useState("");
//     const [result,setResult]=useState<SearchResultDTO | null>(null);

//   const token = localStorage.getItem("token");

//   const handleSearch = async () => {
//     if(!query.trim())
//     {
//       toast.warning("Search is Invalid")
//       return;
//     }
//     try{
//       console.log(query)
//     await authFetch(`https://localhost:7102/api/UserAuth/search-all?query=${query}`, token, {
//       method: "GET",
//     }).then(res=>res.json())
//       .then(data=>setResult(data));

//     console.log(result)

//     setQuery('')
//     }
//     catch(err)
//     {
//       console.log(err);
//       toast.error("An error occured while searching");
//     }
    
    
//   };
  

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl mb-6 font-bold text-center">Library Search</h1>
//       <div className="flex gap-4 mb-8 justify-center">
//         <Input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search Authors, Books, Users here by name..."
//           className="p-2 border rounded w-1/3"
//           required
//         ></Input>
//         <Button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search
//         </Button>
//       </div>
//       {
//         result && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{result.authorS.map(author=>(
//             <div key={author.id} className="bg-white p-4 rounded shadow">
//               <h3 className="text-xl font-bold">{author.name}</h3>
//               <p><strong>Author Id: </strong>{author.id}</p>
//               <p><strong>Author Bio: </strong>{author.bio}</p>
//             </div>

//           ))}
//           {
//             result.bookS.map(book=>(
//                 <div key={book.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
//                     <h3 className="text-xl font-bold mb-2">Book : {book.title}</h3>
//                     <p><strong>Book Id: </strong>{book.id}</p>
//                     <p><strong>Author Id: </strong>{book.authorId}</p>
//                     <p><strong>ISBN: </strong>{book.isbn}</p>
//                     <p><strong>Genre: </strong>{book.genre}</p>
//                     <p><strong>Publishers: </strong>{book.publishers}</p>
//                     <p><strong>Stock: </strong>{book.stock}</p>
//                 </div>
//             ))
//           }
//           {
//             result !=null && result.authorS.map(author=>(
//                 <div key={author.id} className="p-4 bg-white rounded-lg shadow-lg border hover:shadow-xl transition">
//                     <h3 className="text-xl font-bold mb-2">Author : {author.name}</h3>
//                     <p><strong>Author Id: </strong>{author.id}</p>
//                     <p><strong>Author Bio: </strong>{author.bio}</p>
                  
//                 </div>
//             ))
           
//           }
//           </div>
//         )
//       }
    
//         {!result && <p className="text-center text-gray-500 mt-6">No Search Results yet...</p>}
     
       

//       </div>
//     // </div>
//   );
// };

// export default Search;