import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section
        className="min-h-[90vh] flex items-center justify-center bg-cover bg-center px-6 text-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-transparent z-0"></div>

        {/* Content */}
        <div
          className="relative z-10 bg-white/80 backdrop-blur-md p-10 md:p-14 rounded-xl shadow-2xl max-w-3xl animate-fade-in-up"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-purple-800 mb-4 transition duration-500">
            Welcome to the Online Library
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Borrow books, explore collections, and manage your account with ease.
          </p>
          <div className="flex justify-center gap-6">
            <Button
              className="transition-transform hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="transition hover:border-purple-600 hover:text-purple-700 hover:shadow-md"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/button';

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <section
//         className="min-h-[90vh] flex items-center justify-center bg-cover bg-center px-6 text-center"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
//         }}
//       >
//         <div className="bg-white bg-opacity-80 p-8 rounded-md shadow-md max-w-2xl">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-purple-800 mb-4">
//             Welcome to the Online Library
//           </h1>
//           <p className="text-gray-700 text-lg mb-6">
//             Borrow books, explore collections, and manage your account easily.
//           </p>
//           <div className="flex justify-center gap-4">
//             <Button onClick={() => navigate("/login")}>Login</Button>
//             <Button variant="outline" onClick={() => navigate("/register")}>Register</Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Landing;


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Button } from '../../components/ui/button';


// const Landing = () => {
//     const navigate = useNavigate();
//   return (
//     <div>
//         <section className='bg-gradient-to-br from-purple-100 ro-blue-200 min-h-[80vh] flex flex-col items-center justify-center text-center px-4'>
//             <h1 className='text-4xl md:text-6xl font-bold mb-6 text-gray-800 animate-pulse'>Welcome to the Online Library</h1>
//             <p className='mb-8 text-lg text-gray-600'>Borrow Books,explore Collections, and manage your library account seamlessly.</p>
//             <div className='flex gap-4'>
//                 <Button onClick={()=>navigate("/login")}>Login</Button>
//                 <Button variant="outline" onClick={()=>navigate("/register")}>Register</Button>
//             </div>
//         </section>

//     </div>
//   )
// }

// export default Landing