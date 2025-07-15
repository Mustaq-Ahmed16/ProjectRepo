import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'

import Landing from './pages/LibrarianPages/Landing'
import Login from './pages/LibrarianPages/Login'
import Register from './pages/LibrarianPages/Register'
import Welcome from './pages/LibrarianPages/Welcome'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import MyBorrowedBooks from './UserPages/MyBorrowedBooks'
import UserBooks from './UserPages/UserBooks'
import UserDashboard from './UserPages/UserDashboard'
import LibrarianDashboard from './pages/LibrarianPages/LibrarianDashboard'
import ManageBooks from './pages/LibrarianPages/ManageBooks'
import ManageAuthors from './pages/LibrarianPages/ManageAuthors'
import BorrowBook from './pages/LibrarianPages/BorrowBook'
import ShowAllUsers from './pages/LibrarianPages/ShowAllUsers'
import ShowAllBorrowedBooks from './pages/LibrarianPages/ShowAllBorrowedBooks'
import ReturnBook from './pages/LibrarianPages/ReturnBook'
import Search from './pages/LibrarianPages/Search';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

         <Route path="/librarian" element={<LibrarianDashboard/>} />
        <Route path="/librarian/books" element={<ManageBooks />} />
          <Route path="/librarian/authors" element={<ManageAuthors />} />
          <Route path="/librarian/borrow" element={<BorrowBook />} />
          <Route path="/librarian/users" element={<ShowAllUsers />} />
          <Route path="/librarian/borrowed" element={<ShowAllBorrowedBooks />} />
          <Route path="/librarian/return" element={<ReturnBook />} />
          <Route path="/librarian/search" element={<Search />} />
        
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/books" element={<UserBooks />} />
          <Route path="/user/borrowed" element={<MyBorrowedBooks />} />






          {/* <Route
            path="/welcome"
            element={
              <Welcome
                role={localStorage.getItem("role") as "librarian" | "user"}
              />
            }
          />
          <Route
            path="/librarian"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <LibrarianDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/books"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <ManageBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/authors"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <ManageAuthors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/borrow"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <BorrowBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/users"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <ShowAllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/borrowed"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <ShowAllBorrowedBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/return"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <ReturnBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/librarian/search"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <Search />
              </ProtectedRoute>
            }
          /> */}
          {/* User Routes */}
          {/*<Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/books"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/borrowed"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyBorrowedBooks />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
