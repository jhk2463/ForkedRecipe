import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import GradientCard from "./GradientCard";
import nativeApi from "../apis/nativeApi";

function UserRecipes(props) {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    getUserRecipes();
  }, []);

  const getUserRecipes = async () => {
    try {
      const response = await nativeApi.get(`/recipes`);
      setUserRecipes(response.data);
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
