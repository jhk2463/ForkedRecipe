import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import RecipeCard from "../components/RecipeCard";
import { useGetUserId } from "../hooks/useGetUserId";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const userId = useGetUserId();
  const nativeApiPrivate = useAxiosPrivate();

  useEffect(() => {
    getMyRecipes();
  }, []);

  const getMyRecipes = async () => {
    try {
      const response = await nativeApiPrivate.get(`/myrecipes/${userId}`);
      setMyRecipes(response.data.myRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const response = await nativeApiPrivate.put(`/myrecipes/delete`, {
        recipeId,
        userId,
      });
      setMyRecipes(response.data.myRecipes);
      alert("Recipe deleted");
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
      {myRecipes.length === 0 && <h3>No recipes created</h3>}
      <Grid>
        {myRecipes.map((recipe) => {
          return (
            <div key={recipe._id}>
              <Sidebar id="sidebar">
                <EditButton to={`/editrecipe/${recipe._id}`}>
                  <FaEdit />
                </EditButton>
                <DeleteButton onClick={() => handleDelete(recipe._id)}>
                  <FaTrash />
                </DeleteButton>
              </Sidebar>

              <RecipeCard
                title={recipe.title}
                image={recipe.imageUrl}
                id={recipe._id}
                tag={"user"}
              ></RecipeCard>
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
  column-gap: 3rem;
  row-gap: 1rem;
`;

const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.4rem;

  position: relative;
  top: 0.3rem;
  width: 3.5rem;
  height: 2rem;
  background: transparent;
  box-shadow: 2px -2px 2px #dddddd;
  border-radius: 0.7rem;
  z-index: 3;
`;

const EditButton = styled(NavLink)`
  border: none;
  background: transparent;
  svg {
    color: #5f5f5f;
    transform: scale(1);
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  svg {
    color: #5f5f5f;
    transform: scale(1);
  }
`;

export default MyRecipes;
