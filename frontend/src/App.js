import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

import Pages from "./pages/Pages";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./app.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <Logo>
            <GiKnifeFork />
            <LogoLink to={"/"}>{`{forkedrecipe}`}</LogoLink>
          </Logo>
          <SLink to={"/login"}>Login/Signup</SLink>
        </Nav>
        <Routes>
          <Route path="/*" element={<Pages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const Nav = styled.div`
  padding: 3rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  svg {
    font-size: 2rem;
    transform: translate(0, -0.35rem);
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 400;
  font-family: "Borel";
`;

const SLink = styled(Link)`
  padding-top: 0.5rem;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 400;
  font-family: "Borel";
  transform: translate(0, -0.15rem);
  border-radius: 1rem;
  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export default App;
