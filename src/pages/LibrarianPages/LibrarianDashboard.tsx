import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  BookOpen,
  Users,
  ClipboardList,
  ArrowRightLeft,
  Search,
  UserCheck,
  UserPlus,
} from 'lucide-react'; // optional icons library

const LibrarianDashboard = () => {
  const [selected, setSelected] = useState('Manage Books');

  const options = [
    { label: 'Manage Books', icon: <BookOpen size={18} /> },
    { label: 'Manage Authors', icon: <UserPlus size={18} /> },
    { label: 'Insert Borrow Record', icon: <ClipboardList size={18} /> },
    { label: 'Update Return Record', icon: <ArrowRightLeft size={18} /> },
    { label: 'Show Users', icon: <Users size={18} /> },
    { label: 'Show Borrowed Book Users', icon: <UserCheck size={18} /> },
    { label: 'Search', icon: <Search size={18} /> },
  ];

  const renderContent = () => {
    switch (selected) {
      case 'Manage Books':
        return <div className="animate-fade-in">📚 Book management section here.</div>;
      case 'Manage Authors':
        return <div className="animate-fade-in">🖋️ Author management section.</div>;
      case 'Insert Borrow Record':
        return <div className="animate-fade-in">📝 Insert borrow records here.</div>;
      case 'Update Return Record':
        return <div className="animate-fade-in">🔄 Return update interface.</div>;
      case 'Show Users':
        return <div className="animate-fade-in">👥 List of users.</div>;
      case 'Show Borrowed Book Users':
        return <div className="animate-fade-in">📖 Borrowed book users list.</div>;
      case 'Search':
        return <div className="animate-fade-in">🔍 Search panel here.</div>;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4 border-r transition-all duration-500">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Dashboard</h2>
        {options.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => setSelected(item.label)}
            className={`w-full justify-start space-x-2 py-2 text-left transition-all duration-200 ${
              selected === item.label
                ? 'bg-purple-100 text-purple-800 font-semibold'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 transition-all duration-300">
        <h1 className="text-3xl font-semibold text-purple-700 mb-6 animate-fade-in">
          {selected}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default LibrarianDashboard;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/button';

// const LibrarianDashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
//       <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center animate-fade-in">
//         Librarian Dashboard
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
//         {[
//           { label: "Manage Books", path: "/librarian/books" },
//           { label: "Manage Authors", path: "/librarian/authors" },
//           { label: "Insert Borrow Record", path: "/librarian/borrow" },
//           { label: "Update Return Record", path: "/librarian/return" },
//           { label: "Show Users", path: "/librarian/users" },
//           { label: "Show Borrowed Book Users", path: "/librarian/borrowed" },
//           { label: "Search", path: "/librarian/search" },
//         ].map(({ label, path }) => (
//           <Button
//             key={label}
//             onClick={() => navigate(path.trim())}
//             className="w-full h-20 bg-white text-blue-700 border border-blue-300 hover:bg-blue-100 shadow-md rounded-lg transition-transform duration-200 transform hover:scale-105"
//           >
//             {label}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LibrarianDashboard;



// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Button } from '../../components/ui/button';

// const LibrarianDashboard = () => {
//     const navigate = useNavigate();

//   return (
//     <div className='p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen'>
//         <h1 className='text-3xl font-bild mb-6'>Librarian Dashboard</h1>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//             <Button onClick={()=>navigate("/librarian/books")}>Manage Books</Button>
//             <Button onClick={()=>navigate("/librarian/authors ")}>Manage Authors</Button>
//             <Button onClick={()=>navigate("/librarian/borrow")}>Insert Borrow Record</Button>
//             <Button onClick={()=>navigate("/librarian/return")}>Update Return Record</Button>
//             <Button onClick={()=>navigate("/librarian/users")}>Show Users</Button>
//             <Button onClick={()=>navigate("/librarian/borrowed")}>Show Borrowed Book Users</Button>
//             <Button onClick={()=>navigate("/librarian/search")}>Search</Button>
//         </div>
//     </div>
//   )
// }

// export default LibrarianDashboard