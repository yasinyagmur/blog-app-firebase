import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Footer from "../components/Footer";
import About from "../pages/About";

const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  const PrivateRouter = () => {
    return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:id" element={<PrivateRouter />}>
            <Route path="" element={<Details />} />
          </Route>
          <Route path="/newblog" element={<PrivateRouter />}>
            <Route path="/newblog" element={<NewBlog />} />
          </Route>
          <Route path="/profile" element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
