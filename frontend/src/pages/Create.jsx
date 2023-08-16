import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGetUserId } from "../hooks/useGetUserId";
import { BsPlusCircleFill } from "react-icons/bs";

const nativeApi = axios.create({
  baseURL: "http://localhost:3001",
});

function Create() {
  const [cookies, _] = useCookies(["access_token"]);
  const userId = useGetUserId();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    imageUrl: "",
    cookingTime: 0,
    owner: userId,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setRecipe({ ...recipe, [id]: value });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleInstructionChange = (event, idx) => {
    const { value } = event.target;
    const instructions = recipe.instructions;
    instructions[idx] = value;
    setRecipe({ ...recipe, instructions: instructions });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await nativeApi.post("/recipes", recipe);
      console.log(response);
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h2 style={{ marginLeft: "8.2%" }}>Create your recipe</h2>
      <FormStyle id="form" onSubmit={onSubmit}>
        <LCol>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={recipe.title}
            placeholder="Name of your recipe"
            onChange={handleChange}
          ></input>

          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={recipe.imageUrl}
            placeholder="A photo of your dish"
            onChange={handleChange}
          ></input>
          <label htmlFor="cookingTime">Cooking Time</label>
          <input
            type="number"
            id="cookingTime"
            value={recipe.cookingTime}
            placeholder="(minutes)"
            onChange={handleChange}
          ></input>
          <label htmlFor="ingredients">Ingredients</label>
          <button onClick={(event) => addIngredient(event)} type="button">
            <BsPlusCircleFill />
          </button>
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              type="text"
              id="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
        </LCol>
        <RCol>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={recipe.description}
            placeholder="Brief description"
            onChange={handleChange}
          ></textarea>

          <label htmlFor="instructions">Instructions</label>
          <button onClick={addInstruction} type="button">
            <BsPlusCircleFill />
          </button>
          {recipe.instructions.map((instructions, idx) => (
            <input
              key={idx}
              type="text"
              id="instructions"
              value={instructions}
              onChange={(event) => handleInstructionChange(event, idx)}
            />
          ))}
        </RCol>
      </FormStyle>
      <SButton form="form" type="submit">
        Create Recipe
      </SButton>
    </motion.div>
  );
}

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  gap: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
  h4 {
    margin: 0;
    margin-bottom: 1rem;
  }
  label {
    font-weight: 500;
    margin-bottom: 0.2rem;
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
  textarea {
    width: 100%;
    height: 14.4rem;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 1rem;
    border: none;
    border-radius: 0.6rem;
    outline: none;
    margin-bottom: 0.6rem;
  }
  ::placeholder {
    color: #cfcfcf;
  }
  Link {
    font-size: 0.5rem;
  }
  button {
    color: #f27121;
    border: none;
    background: transparent;
    margin-top: 0.5rem;
  }
  svg {
    margin-left: 0.3rem;
    transform: scale(1.1);
  }
`;

const LCol = styled.div`
  width: 30%;
`;
const RCol = styled.div`
  width: 50%;
`;

const SButton = styled.button`
  width: 30%;
  height: 3rem;
  background: linear-gradient(to right, #f27121, #e94057);
  color: white;
  border: none;
  border-radius: 0.6rem;
  margin-top: 0.5rem;
  margin-bottom: 10%;
  transform: translate(120%, 0);
`;

export default Create;
