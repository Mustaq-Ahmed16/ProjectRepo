import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { authFetch } from "../../Fetch/api";
import { toast } from "sonner";

const ReturnBook = () => {
  const [borrowBookId, setBorrowedBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleReturn = async () => {
    if (!borrowBookId || !returnDate) {
      toast.warning("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      await authFetch(`https://localhost:7102/api/borrows/return/${borrowBookId}`, token, {
        method: "PUT",
        body: JSON.stringify({ borrowBookId, returnDate }),
      });
      toast.success("Return record updated successfully.");
      setBorrowedBookId("");
      setReturnDate("");
    } catch {
      toast.error("Failed to update return record.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Update Return Record</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Borrowed Book ID</label>
            <Input
              placeholder="Enter Borrowed Book ID"
              value={borrowBookId}
              onChange={(e) => setBorrowedBookId(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Return Date</label>
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <Button
            onClick={handleReturn}
            className="w-full transition hover:scale-105"
            disabled={loading}
          >
            {loading ? "Updating..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;


// import React,{ useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { authFetch } from "../../Fetch/api";
// import { useAuth } from "../../context/AuthContext";

// const ReturnBook = () => {
//   const [borrowBookId, setBorrowedBookId] = useState("");
//   const [returnDate, setReturnDate] = useState("");

//   const token=localStorage.getItem("token");

//   const handleReturn = () => {
//     authFetch(`https://localhost:7102/api/borrows/return/${borrowBookId}`, token,{
//       method: "PUT",
//       body: JSON.stringify({ borrowBookId,returnDate }),
//     }).then(() => alert("Return Updated"));
//     setBorrowedBookId("")
//     setReturnDate("")
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold">Update Return Record</h2>
//       <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Borrowed Book Id</label>
//       <Input placeholder="Borrowed Book ID" value={borrowBookId} onChange={e => setBorrowedBookId(e.target.value)} />
//       <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Return Date</label>
//       <Input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
//       <Button onClick={handleReturn}>Submit</Button>
//     </div>
//   );
// };

// export default ReturnBook;