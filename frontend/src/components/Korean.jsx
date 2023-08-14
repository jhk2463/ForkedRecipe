import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import GradientCard from "./GradientCard";

const spoonApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});
const SPOONACULAR_KEY = process.env.REACT_APP_SPOONACULAR_KEY;

function Korean() {
  const [korean, setKorean] = useState([]);

  useEffect(() => {
    getKorean();
  }, []);

  const getKorean = async () => {
    const check = localStorage.getItem("korean");
    if (check) {
      setKorean(JSON.parse(check));
    } else {
      const { data } = await spoonApi.get(
        `/random?apiKey=${SPOONACULAR_KEY}&tags=korean&number=8`
      );
      localStorage.setItem("korean", JSON.stringify(data.recipes));
      setKorean(data.recipes);
    }
  };

  return (
    <div>
      <h3>Korean Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
        }}
      >
        {korean.map((recipe) => {
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

export default Korean;
