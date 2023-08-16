import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import { useGetUserId } from "../hooks/useGetUserId";

const nativeApi = axios.create({
  baseURL: "http://localhost:3001",
});

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const userId = useGetUserId();

  useEffect(() => {
    getMyRecipes();
  }, []);

  const getMyRecipes = async () => {
    try {
      const { data } = await nativeApi.get(`/recipes/${userId}`);
      console.log(data.myRecipes);
      setMyRecipes(data.myRecipes);
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
      <h2>My Recipes</h2>
      <Grid>
        {myRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe._id}
              title={recipe.title}
              image={recipe.imageUrl}
              id={recipe._id}
            />
          );
        })}
      </Grid>
    </motion.div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 2fr));
  column-gap: 2rem;
  row-gap: 1rem;
  margin-top: 3rem;
`;

export default MyRecipes;
