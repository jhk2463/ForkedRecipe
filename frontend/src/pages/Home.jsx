import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Popular from "../components/Popular";
import Korean from "../components/Korean";
import UserRecipes from "../components/UserRecipes";
import { useGetUserId } from "../hooks/useGetUserId";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Home() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  const nativeApiPrivate = useAxiosPrivate();

  useEffect(() => {
    if (userId) {
      getSavedRecipes();
    }
  }, []);

  const getSavedRecipes = async () => {
    try {
      const response = await nativeApiPrivate.get(
        `/savedrecipes/ids/${userId}`
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const saveRecipe = async (recipeId) => {
    try {
      const response = await nativeApiPrivate.put("/savedrecipes", {
        recipeId,
        userId,
      });
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
