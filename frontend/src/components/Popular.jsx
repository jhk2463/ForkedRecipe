import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import GradientCard from "./GradientCard";

const spoonApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});
const SPOONACULAR_KEY = process.env.REACT_APP_SPOONACULAR_KEY;

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const { data } = await spoonApi.get(
        `/random?apiKey=${SPOONACULAR_KEY}&number=8`
      );
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
        }}
      >
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <GradientCard
                title={recipe.title}
                image={recipe.image}
                id={recipe.id}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Popular;
