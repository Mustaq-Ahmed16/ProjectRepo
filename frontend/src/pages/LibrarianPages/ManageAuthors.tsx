import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { authFetch } from "../../Fetch/api";
import { toast } from "sonner";

interface Author {
  id: number;
  name: string;
  bio: string;
}

const ManageAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState<Partial<Author>>({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://localhost:7102/api/author/allauthors")
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, []);

  const handleAddOrUpdate = () => {
    if(Object.keys(form).length==0)
    {
      toast.warning("Enter required Details");
      return;
    }
    try{
      if (form.id) {
      authFetch(`https://localhost:7102/api/author/${form.id}`,token, {
        method: "PUT",
       
        body: JSON.stringify(form),
      }).then(() => window.location.reload());
    } else {
      authFetch("https://localhost:7102/api/author",token ,{
        method: "POST",
        body: JSON.stringify({name:form.name,bio:form.bio,books:[]}),
      }).then(() => window.location.reload());
    }

    }
    catch(err){
      console.log(err);
      toast.error("An Error Occured");
    }
  };

  const handleDelete = (id: number) => {
    authFetch(`https://localhost:7102/api/author/${id}`,token, { method: "DELETE" }).then(() => window.location.reload());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Authors</h2>

      <div className="grid gap-2 mb-4">
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Author Name</label>
        <Input placeholder="Author Name" value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
        <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Author Bio</label>
        <Input placeholder="Bio" value={form.bio || ""} onChange={e => setForm({ ...form, bio: e.target.value })} />
        <Button onClick={handleAddOrUpdate}>{form.id ? "Update" : "Add"} Author</Button>
      </div>

      <div className="space-y-2">
        {authors.map(author => (
          <div key={author.id} className="p-4 bg-gray-100 rounded shadow flex justify-between">
            <div>
              <h3 className="font-bold">{author.name}</h3>
              <p className="text-sm text-gray-600">AuthorId : {author.id} | Bio : {author.bio}</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" onClick={() => setForm(author)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(author.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAuthors;
