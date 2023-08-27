import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

import RecipeCard from "../components/RecipeCard";
import { useGetUserId } from "../hooks/useGetUserId";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  const nativeApiPrivate = useAxiosPrivate();

  useEffect(() => {
    getSavedRecipes();
  }, []);

  const getSavedRecipes = async () => {
    try {
      const response = await nativeApiPrivate.get(`/savedrecipes/${userId}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const { data } = await nativeApiPrivate.put(`/savedrecipes/remove`, {
        recipeId,
        userId,
      });
      setSavedRecipes(data.savedRecipes);
      alert("Recipe removed");
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
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 && <h3>No saved recipes</h3>}
      <Grid>
        {savedRecipes.map((recipe) => {
          return (
            <div key={recipe._id}>
              <Sidebar id="sidebar">
                <DeleteButton onClick={() => handleDelete(recipe._id)}>
                  <RxCross2 />
                </DeleteButton>
              </Sidebar>
              <RecipeCard
                title={recipe.title}
                image={recipe.imageUrl}
                id={recipe._id}
                tag={"user"}
              />
            </div>
          );
        })}
      </Grid>
    </motion.div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%/3, max(64px, 100%/5)), 1fr)
  );
  column-gap: 2rem;
  row-gap: 1rem;
`;

const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.4rem;

  position: relative;
  top: 0.4rem;
  width: 2rem;
  height: 2rem;
  background: transparent;
  box-shadow: 2px -2px 2px #dddddd;
  border-radius: 0.7rem;
  z-index: 3;
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  svg {
    color: #5f5f5f;
    transform: scale(1.2);
  }
`;

export default SavedRecipes;
