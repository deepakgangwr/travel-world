// src/App.js
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetails";
import AddBlog from "./Pages/AddBlog";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
