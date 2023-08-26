import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";

import spoonApi from "../apis/spoonApi";
const SPOONACULAR_KEY = process.env.REACT_APP_SPOONACULAR_KEY;

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  useEffect(() => {
    getSearched();
  }, [params.search]);

  const getSearched = async () => {
    const check = localStorage.getItem(params.search);
    if (check) {
      setSearchedRecipes(JSON.parse(check));
    } else {
      const { data } = await spoonApi.get(
        `/complexSearch?apiKey=${SPOONACULAR_KEY}&query=${params.search}&number=9`
      );
      localStorage.setItem(params.search, JSON.stringify(data.results));
      setSearchedRecipes(data.results);
    }
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {searchedRecipes.map((recipe) => {
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

export default Searched;
