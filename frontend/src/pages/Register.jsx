import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const nativeApi = axios.create({
  baseURL: "http://localhost:3001",
});

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await nativeApi.post("/users", {
        displayName,
        email,
        password,
      });
      // setCookies("access_token", response.data.token);
      // window.localStorage.setItem("userID", response.data.userID);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormStyle onSubmit={onSubmit}>
      <h2>Sign up</h2>
      <h4>to start creating, sharing, and saving</h4>
      <label htmlFor="displayName">Display Name</label>
      <input
        type="text"
        id="displayName"
        value={displayName}
        placeholder="Your Name"
        onChange={(event) => setDisplayName(event.target.value)}
      ></input>
      <label htmlFor="email">Email Address</label>
      <input
        type="text"
        id="email"
        value={email}
        placeholder="yourname@example.com"
        onChange={(event) => setEmail(event.target.value)}
      ></input>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        placeholder="Enter your password"
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button type="submit">SIGN UP</button>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0% 35%;
  div {
    position: relative;
    width: 100%;
  }

  h4 {
    margin: 0;
    margin-bottom: 1rem;
  }
  label {
    font-weight: 500;
  }
  input {
    width: 100%;
    height: 3rem;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 1rem;
    border: none;
    border-radius: 0.6rem;
    outline: none;
    margin-bottom: 1rem;
  }
  ::placeholder {
    color: #cfcfcf;
  }
  Link {
    font-size: 0.5rem;
  }
  button {
    width: 100%;
    height: 3rem;
    background: linear-gradient(to right, #f27121, #e94057);
    color: white;
    border: none;
    border-radius: 0.6rem;
    margin-top: 0.5rem;
  }
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
`;

export default Register;
