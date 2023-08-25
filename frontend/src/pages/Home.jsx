import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Popular from "../components/Popular";
import Korean from "../components/Korean";
import { useGetUserId } from "../hooks/useGetUserId";
import UserRecipes from "../components/UserRecipes";

const nativeApi = axios.create({
  baseURL: "http://localhost:3001",
});

function Home() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userId = useGetUserId();

  useEffect(() => {
    getSavedRecipes();
  }, []);

  const getSavedRecipes = async () => {
    try {
      const response = await nativeApi.get(`/savedrecipes/ids/${userId}`);
      console.log(response.data.savedRecipes);
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const saveRecipe = async (recipeId) => {
    console.log(recipeId);
    try {
      const response = await nativeApi.put("/savedrecipes", {
        recipeId,
        userId,
      });
      console.log(response.data.savedRecipes);
      setSavedRecipes(response.data.savedRecipes);
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
      <UserRecipes saveRecipe={saveRecipe} savedRecipes={savedRecipes} />
      <Popular saveRecipe={saveRecipe} savedRecipes={savedRecipes} />
      <Korean saveRecipe={saveRecipe} savedRecipes={savedRecipes} />
    </motion.div>
  );
}

export default Home;
