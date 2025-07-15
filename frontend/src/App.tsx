import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import LibrarianDashboard from "./pages/LibrarianPages/LibrarianDashboard";
import ManageBooks from "./pages/LibrarianPages/ManageBooks";
import BorrowBook from "./pages/LibrarianPages/BorrowBook";
import ReturnBook from "./pages/LibrarianPages/ReturnBook";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import UserDashboard from "./UserPages/UserDashboard";
import ManageAuthors from "./pages/LibrarianPages/ManageAuthors";
import UserBooks from "./UserPages/UserBooks";
import MyBorrowedBooks from "./UserPages/MyBorrowedBooks";
import ShowAllUsers from "./pages/LibrarianPages/ShowAllUsers";
import ShowAllBorrowedBooks from "./pages/LibrarianPages/ShowAllBorrowedBooks";
import Search from "./pages/LibrarianPages/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
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
          />
          {/* User Routes */}
          <Route
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
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
