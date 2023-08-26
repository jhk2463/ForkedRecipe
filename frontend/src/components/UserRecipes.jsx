import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";

import GradientCard from "./GradientCard";
import RecipeCard from "./RecipeCard";

const nativeApi = axios.create({
  baseURL: "http://localhost:3001",
});

function UserRecipes(props) {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    getUserRecipes();
  }, []);

  const getUserRecipes = async () => {
    try {
      const { data } = await nativeApi.get(`/recipes`);
      setUserRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>User Created Recipes</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "2rem",
          padding: { left: "1.5rem", right: "1.5rem" },
        }}
      >
        {userRecipes.map((recipe) => {
          return (
            <SplideSlide key={recipe._id}>
              <GradientCard
                title={recipe.title}
                image={recipe.imageUrl}
                id={recipe._id}
                tag={"user"}
                saveRecipe={props.saveRecipe}
                isSaved={props.savedRecipes.includes(recipe._id) ? true : false}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default UserRecipes;