import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import UpdateBlog from "../pages/UpdateBlog";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
          <Route path="/detail" element={<PrivateRouter />}>
            <Route element={<Details />} />
          </Route>
          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
          {/* <Route path="*" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
