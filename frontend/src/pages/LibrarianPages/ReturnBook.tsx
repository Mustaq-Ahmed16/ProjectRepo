import React,{ useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { authFetch } from "../../Fetch/api";
import { useAuth } from "../../context/AuthContext";

const ReturnBook = () => {
  const [borrowBookId, setBorrowedBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const token=localStorage.getItem("token");

  const handleReturn = () => {
    authFetch(`https://localhost:7102/api/borrows/return/${borrowBookId}`, token,{
      method: "PUT",
      body: JSON.stringify({ borrowBookId,returnDate }),
    }).then(() => alert("Return Updated"));
    setBorrowedBookId("")
    setReturnDate("")
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Update Return Record</h2>
      <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Borrowed Book Id</label>
      <Input placeholder="Borrowed Book ID" value={borrowBookId} onChange={e => setBorrowedBookId(e.target.value)} />
      <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Return Date</label>
      <Input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
      <Button onClick={handleReturn}>Submit</Button>
    </div>
  );
};

export default ReturnBook;
