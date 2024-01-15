import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../views/home/Home";
import DetailsViews from "../views/details/Details-views";
import Search from "../views/search/Search";
import Login from "../views/login/Login";
import NavBars from "../components/nav-bar/NavBar";
import Register from "../views/register/Register";
import Profile from "../views/profile/Profile";
import Footer from "../components/footer/Footer";
import CreateRecipes from "../views/Create-recipes/Create-recipes";
import EditViews from "../views/edit-recipes/Edit-recipes"

const Router = () => {
  return (
    <BrowserRouter>
      <NavBars />
      <div className="routes-container">
        <Routes>
          <Route path="/login/:redirectTo" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:busqueda" element={<Search />} />
          <Route path="/register/:redirectTo" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateRecipes />} />
          <Route path="/recipes/:id" element={<DetailsViews />} />
          <Route path="/edit/:id" element={<EditViews />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
