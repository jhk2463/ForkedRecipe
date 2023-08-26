import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { useCookies } from "react-cookie";
import { RiArrowDownSFill } from "react-icons/ri";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const nativeApiPrivate = useAxiosPrivate();

  const logout = () => {
    try {
      nativeApiPrivate.put(`/session`);
      setAuth({});
      alert("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavWrapper>
      <Nav>
        <Logo>
          <GiKnifeFork />
          <LogoLink to={"/"}>{`{forkedrecipe}`}</LogoLink>
        </Logo>

        <Menu>
          <SLink to={!auth.accessToken ? "/auth/login" : "/create"}>
            Create Recipe
          </SLink>
          <SLink to={!auth.accessToken ? "/auth/login" : "/myrecipes"}>
            My Recipes
          </SLink>
          <SLink to={!auth.accessToken ? "/auth/login" : "/savedrecipes"}>
            Saved Recipes
          </SLink>
        </Menu>

        {!auth.accessToken ? (
          <SLink to={"/auth/login"}>Login/Signup</SLink>
        ) : (
          <Dropdown>
            <SLink>
              {auth.displayName}
              <RiArrowDownSFill />
            </SLink>
            <div>
              {/* <SLink
                to={"/"}
                style={{ fontSize: "1rem", textDecoration: "underline" }}
              >
                Profile
              </SLink> */}
              <SLink
                to={"/auth/login"}
                onClick={logout}
                style={{ fontSize: "1rem", textDecoration: "underline" }}
              >
                Logout
              </SLink>
            </div>
          </Dropdown>
        )}
      </Nav>
    </NavWrapper>
  );
}
const NavWrapper = styled.div`
  border-bottom: 2px solid #c0c0c0;
  margin: 0 -15%;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
`;
const Nav = styled.div`
  margin: 0 5%;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  background: linear-gradient(to right, #f27121, #e94057);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  svg {
    font-size: 2rem;
    transform: translate(0, -0.35rem);
    color: #f27121;
  }
`;

const LogoLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 400;
  font-family: "Borel";
`;

const SLink = styled(NavLink)`
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
  svg {
    font-size: 1.5rem;
    transform: translate(0, -0.15rem);
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const Dropdown = styled.div`
  width: 11rem;
  text-align: right;
  div {
    text-align: right;
    width: 11rem;
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  &:hover div {
    display: flex;
  }
`;

export default Navbar;
