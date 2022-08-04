import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import UpdateBlog from "../pages/UpdateBlog";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details:title" element={<Details />} />
          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;