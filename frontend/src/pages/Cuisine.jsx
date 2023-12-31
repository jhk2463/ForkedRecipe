import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import spoonApi from "../apis/spoonApi";

const SPOONACULAR_KEY = process.env.REACT_APP_SPOONACULAR_KEY;

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  useEffect(() => {
    getCuisine();
  }, [params.type]);

  const getCuisine = async () => {
    const check = localStorage.getItem(params.type);
    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const { data } = await spoonApi.get(
        `/random?apiKey=${SPOONACULAR_KEY}&tags=${params.type}&number=12`
      );
      localStorage.setItem(params.type, JSON.stringify(data.recipes));
      setCuisine(data.recipes);
    }
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {cuisine.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            id={recipe.id}
            tag={"spoon"}
          />
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%/3, max(64px, 100%/5)), 1fr)
  );
  column-gap: 2rem;
  row-gap: 1rem;
`;

export default Cuisine;
