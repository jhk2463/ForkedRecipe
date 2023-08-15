import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import Category from "../components/Category";
import Search from "../components/Search";

const spoonApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});
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
        `/random?apiKey=${SPOONACULAR_KEY}&tags=${params.type}&number=9`
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
          />
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 2fr));
  column-gap: 2rem;
  row-gap: 1rem;
`;

export default Cuisine;
