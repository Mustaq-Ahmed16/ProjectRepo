// src/pages/UserDashboard.tsx
import { Button } from "../components/ui/button";
import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-green-600 mb-6">📘 My Dashboard</h2>

        <NavLink to="books">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "outline"}
              className="w-full text-left"
            >
              📚 View Available Books
            </Button>
          )}
        </NavLink>

        <NavLink to="borrowed">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "outline"}
              className="w-full text-left"
            >
              📦 My Borrowed Books
            </Button>
          )}
        </NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;



// import { useNavigate } from "react-router-dom";
// import { Button } from "../components/ui/button";
// import { useState } from "react";
// import { motion } from "framer-motion"; // For smooth transitions (optional but recommended)

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [active, setActive] = useState("books");

//   const handleNavigation = (route: string, label: string) => {
//     setActive(label);
//     navigate(route);
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 space-y-4">
//         <h2 className="text-2xl font-bold text-green-600 mb-6">📘 My Dashboard</h2>

//         <Button
//           variant={active === "books" ? "default" : "outline"}
//           className="w-full text-left"
//           onClick={() => handleNavigation("/user/books", "books")}
//         >
//           📚 View Available Books
//         </Button>

//         <Button
//           variant={active === "borrowed" ? "default" : "outline"}
//           className="w-full text-left"
//           onClick={() => handleNavigation("/user/borrowed", "borrowed")}
//         >
//           📦 My Borrowed Books
//         </Button>
//       </aside>

//       {/* Main content */}
//       <motion.main
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.3 }}
//         className="flex-1 p-8"
//       >
//         <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to your dashboard</h1>
//         <p className="text-gray-600">Use the sidebar to navigate through your features.</p>
//       </motion.main>
//     </div>
//   );
// };

// export default UserDashboard;



// import { useNavigate } from "react-router-dom";
// import { Button } from "../components/ui/button";


// const UserDashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-8 bg-gradient-to-br from-green-50 to-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
//       <div className="flex gap-4">
//         <Button onClick={() => navigate("/user/books")}>View Available Books</Button>
//         <Button onClick={() => navigate("/user/borrowed")}>My Borrowed Books</Button>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;