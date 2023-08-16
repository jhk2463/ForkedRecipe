import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { useCookies } from "react-cookie";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDownSFill } from "react-icons/ri";

import Pages from "./pages/Pages";
import Auth from "./pages/Auth";
import Register from "./pages/Register";

import "./app.css";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";

function App() {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Pages />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
