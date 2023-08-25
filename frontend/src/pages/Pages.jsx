import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";

import Category from "../components/Category";
import Search from "../components/Search";

function Pages() {
  const location = useLocation();
  return (
    <div>
      <Search />
      <Category />
      <AnimatePresence mode="wait">
        {/* {location.pathname.split("/")[1] !== "recipe" && <Category />} */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/recipe/:tag/:id" element={<Recipe />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default Pages;
