import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../Fetch/api";
import { toast } from "sonner";

const BorrowBook = () => {
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const handleBorrow = async () => {
    if (!userId || !bookId || !borrowDate || !returnDate) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await authFetch("https://localhost:7102/api/borrows", token, {
        method: "POST",
        body: JSON.stringify({ userId, bookId, borrowDate, returnDate }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to borrow book.");
      }

      toast.success("📚 Borrow record added successfully!");
      // Clear the form
      setUserId("");
      setBookId("");
      setBorrowDate("");
      setReturnDate("");
    } catch (error) {
      console.error(error);
      toast.error("❌ Could not create borrow record.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-white min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-5 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          📖 Insert Borrow Record
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <Input
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book ID</label>
            <Input
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Borrow Date</label>
            <Input
              type="date"
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <Button
            onClick={handleBorrow}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;


// import { useState } from "react";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { useAuth } from "../../context/AuthContext";
// import { authFetch } from "../../Fetch/api";
// import {toast} from 'sonner'

// const BorrowBook = () => {
//   const [userId, setUserId] = useState<string>("");
//   const [bookId, setBookId] = useState<string>("");
//   const [borrowDate, setBorrowDate] = useState<string>("");
//   const [returnDate,setReturnDate]=useState<string>("")

//   const {token}=useAuth();
//   console.log(token);
  

//   const handleBorrow = () => {
//     authFetch("https://localhost:7102/api/borrows",token, {
//       method: "POST",
//       body: JSON.stringify({ userId, bookId, borrowDate,returnDate }),
//     }).then(() => alert("Borrow Record Added"));
//     toast.success("Borrowed Book Added Successfully.")
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold">Insert Borrow Record</h2>
//       <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>User Id</label>
//       <Input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
//       <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Book Id</label>
//       <Input placeholder="Book ID" value={bookId} onChange={e => setBookId(e.target.value)} />
//       <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Borrow Book Date</label>
//       <Input type="date" value={borrowDate} onChange={e => setBorrowDate(e.target.value)} />
//       <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Return Book Date</label>
//       <Input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
//       <Button onClick={handleBorrow}>Submit</Button>
//     </div>
//   );
// };

// export default BorrowBook;