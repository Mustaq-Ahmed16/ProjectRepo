import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";


const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/user/books")}>View Available Books</Button>
        <Button onClick={() => navigate("/user/borrowed")}>My Borrowed Books</Button>
      </div>
    </div>
  );
};

export default UserDashboard;
