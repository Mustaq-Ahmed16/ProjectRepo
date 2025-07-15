import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { authFetch } from "../../Fetch/api";
import { toast } from "sonner";

interface Author {
  id: number;
  name: string;
  bio: string;
}

const ITEMS_PER_PAGE = 5;

const ManageAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState<Partial<Author>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://localhost:7102/api/author/allauthors")
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  const handleAddOrUpdate = () => {
    if (!form.name || !form.bio) {
      toast.warning("Enter required details");
      return;
    }

    if (form.id) {
      authFetch(`https://localhost:7102/api/author/${form.id}`, token, {
        method: "PUT",
        body: JSON.stringify(form),
      }).then(() => window.location.reload());
    } else {
      authFetch("https://localhost:7102/api/author", token, {
        method: "POST",
        body: JSON.stringify({ name: form.name, bio: form.bio, books: [] }),
      }).then(() => window.location.reload());
    }
  };

  const handleDelete = (id: number) => {
    authFetch(`https://localhost:7102/api/author/${id}`, token, {
      method: "DELETE",
    }).then(() => window.location.reload());
  };

  const paginatedAuthors = authors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(authors.length / ITEMS_PER_PAGE);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601071968473-9bb0cba3be3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Manage Authors</h2>

        {/* Horizontal Form */}
        <div className="flex gap-4 mb-8">
          <Input
            placeholder="Author Name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Author Bio"
            value={form.bio || ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <Button onClick={handleAddOrUpdate}>
            {form.id ? "Update" : "Add"}
          </Button>
        </div>

        {/* Authors Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-purple-200 text-purple-800">
                <th className="py-3 px-4 text-left">Author Name</th>
                <th className="py-3 px-4 text-left">Bio</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAuthors.map((author) => (
                <tr key={author.id} className="border-b hover:bg-purple-50 transition">
                  <td className="py-2 px-4">{author.name}</td>
                  <td className="py-2 px-4">{author.bio}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <Button size="sm" onClick={() => setForm(author)}>✏️</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(author.id)}>🗑️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === index + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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

export default ManageAuthors;



// import { useEffect, useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { authFetch } from "../../Fetch/api";
// import { toast } from "sonner";

// interface Author {
//   id: number;
//   name: string;
//   bio: string;
// }

// const ManageAuthors = () => {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [form, setForm] = useState<Partial<Author>>({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch("https://localhost:7102/api/author/allauthors")
//       .then(res => res.json())
//       .then(data => setAuthors(data));
//   }, []);

//   const handleAddOrUpdate = () => {
//     if (Object.keys(form).length === 0) {
//       toast.warning("Enter required Details");
//       return;
//     }

//     try {
//       if (form.id) {
//         authFetch(`https://localhost:7102/api/author/${form.id}`, token, {
//           method: "PUT",
//           body: JSON.stringify(form),
//         }).then(() => window.location.reload());
//       } else {
//         authFetch("https://localhost:7102/api/author", token, {
//           method: "POST",
//           body: JSON.stringify({ name: form.name, bio: form.bio, books: [] }),
//         }).then(() => window.location.reload());
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("An Error Occurred");
//     }
//   };

//   const handleDelete = (id: number) => {
//     authFetch(`https://localhost:7102/api/author/${id}`, token, {
//       method: "DELETE",
//     }).then(() => window.location.reload());
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center p-8"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1601071968473-9bb0cba3be3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
//       }}
//     >
//       <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Manage Authors</h2>

//         <div className="grid gap-4 mb-8">
//           <div>
//             <label className="block mb-1 text-sm font-semibold text-gray-700">Author Name</label>
//             <Input
//               placeholder="Author Name"
//               value={form.name || ""}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-semibold text-gray-700">Author Bio</label>
//             <Input
//               placeholder="Bio"
//               value={form.bio || ""}
//               onChange={(e) => setForm({ ...form, bio: e.target.value })}
//             />
//           </div>

//           <Button onClick={handleAddOrUpdate} className="w-full">
//             {form.id ? "Update" : "Add"} Author
//           </Button>
//         </div>

//         <div className="space-y-4">
//           {authors.map((author) => (
//             <div
//               key={author.id}
//               className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg shadow flex justify-between items-center hover:shadow-lg transition"
//             >
//               <div>
//                 <h3 className="font-bold text-lg text-purple-800">{author.name}</h3>
//                 <p className="text-sm text-gray-600">ID: {author.id} | Bio: {author.bio}</p>
//               </div>

//               <div className="flex gap-2">
//                 <Button size="sm" onClick={() => setForm(author)}>
//                   Edit
//                 </Button>
//                 <Button size="sm" variant="destructive" onClick={() => handleDelete(author.id)}>
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageAuthors;


// import { useEffect, useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { authFetch } from "../../Fetch/api";
// import { toast } from "sonner";

// interface Author {
//   id: number;
//   name: string;
//   bio: string;
// }

// const ManageAuthors = () => {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [form, setForm] = useState<Partial<Author>>({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch("https://localhost:7102/api/author/allauthors")
//       .then(res => res.json())
//       .then(data => setAuthors(data));
//   }, []);

//   const handleAddOrUpdate = () => {
//     if(Object.keys(form).length==0)
//     {
//       toast.warning("Enter required Details");
//       return;
//     }
//     try{
//       if (form.id) {
//       authFetch(`https://localhost:7102/api/author/${form.id}`,token, {
//         method: "PUT",
       
//         body: JSON.stringify(form),
//       }).then(() => window.location.reload());
//     } else {
//       authFetch("https://localhost:7102/api/author",token ,{
//         method: "POST",
//         body: JSON.stringify({name:form.name,bio:form.bio,books:[]}),
//       }).then(() => window.location.reload());
//     }

//     }
//     catch(err){
//       console.log(err);
//       toast.error("An Error Occured");
//     }
//   };

//   const handleDelete = (id: number) => {
//     authFetch(`https://localhost:7102/api/author/${id}`,token, { method: "DELETE" }).then(() => window.location.reload());
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Authors</h2>

//       <div className="grid gap-2 mb-4">
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Author Name</label>
//         <Input placeholder="Author Name" value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
//         <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Author Bio</label>
//         <Input placeholder="Bio" value={form.bio || ""} onChange={e => setForm({ ...form, bio: e.target.value })} />
//         <Button onClick={handleAddOrUpdate}>{form.id ? "Update" : "Add"} Author</Button>
//       </div>

//       <div className="space-y-2">
//         {authors.map(author => (
//           <div key={author.id} className="p-4 bg-gray-100 rounded shadow flex justify-between">
//             <div>
//               <h3 className="font-bold">{author.name}</h3>
//               <p className="text-sm text-gray-600">AuthorId : {author.id} | Bio : {author.bio}</p>
//             </div>
//             <div className="space-x-2">
//               <Button size="sm" onClick={() => setForm(author)}>Edit</Button>
//               <Button size="sm" variant="destructive" onClick={() => handleDelete(author.id)}>Delete</Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageAuthors;