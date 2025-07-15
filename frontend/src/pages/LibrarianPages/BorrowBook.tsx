import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../Fetch/api";
import {toast} from 'sonner'

const BorrowBook = () => {
  const [userId, setUserId] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");
  const [borrowDate, setBorrowDate] = useState<string>("");
  const [returnDate,setReturnDate]=useState<string>("")

  const {token}=useAuth();
  console.log(token);
  

  const handleBorrow = () => {
    authFetch("https://localhost:7102/api/borrows",token, {
      method: "POST",
      body: JSON.stringify({ userId, bookId, borrowDate,returnDate }),
    }).then(() => alert("Borrow Record Added"));
    toast.success("Borrowed Book Added Successfully.")
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Insert Borrow Record</h2>
      <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>User Id</label>
      <Input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Book Id</label>
      <Input placeholder="Book ID" value={bookId} onChange={e => setBookId(e.target.value)} />
      <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Borrow Book Date</label>
      <Input type="date" value={borrowDate} onChange={e => setBorrowDate(e.target.value)} />
      <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Return Book Date</label>
      <Input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
      <Button onClick={handleBorrow}>Submit</Button>
    </div>
  );
};

export default BorrowBook;
