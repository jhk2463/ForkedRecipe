import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import nativeApi from "../apis/nativeApi";

import spoonApi from "../apis/spoonApi";
const SPOONACULAR_KEY = process.env.REACT_APP_SPOONACULAR_KEY;

function Recipe() {
  const [details, setDetails] = useState({
    title: "",
    summary: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    cookingTime: 0,
  });
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  useEffect(() => {
    console.log(params.tag);
    getDetails();
  }, [params.id]);

  const getDetails = async () => {
    if (params.tag === "spoon") {
      const check = localStorage.getItem(params.id);
      if (check) {
        setDetails(JSON.parse(check));
      } else {
        const { data } = await spoonApi.get(
          `/${params.id}/information?apiKey=${SPOONACULAR_KEY}`
        );
        console.log(data);
        const details = {
          title: data.title,
          summary: data.summary,
          ingredients: data.extendedIngredients.map(
            (ingredient) => ingredient.original
          ),
          instructions: data.instructions,
          image: data.image,
          cookingTime: data.cookingMinutes,
        };
        localStorage.setItem(params.id, JSON.stringify(data));
        setDetails(details);
      }
    } else if (params.tag === "user") {
      const { data } = await nativeApi.get(`/recipes/${params.id}`);
      const details = {
        title: data.recipe.title,
        summary: data.recipe.description,
        ingredients: data.recipe.ingredients,
        instructions: data.recipe.instructions,
        image: data.recipe.imageUrl,
        cookingTime: data.recipe.cookingTime,
      };
      setDetails(details);
    }
  };

  return (
    <DetailWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            {params.tag === "spoon" ? (
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            ) : (
              <ul>
                {details.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction} </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient} </li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled(motion.div)`
  margin: 5rem 0rem;
  display: flex;
  h2 {
    margin-bottom: 2rem;
    width: 35rem;
  }
  h3 {
    font-size: 1rem;
    margin-top: 1.5rem;
  }
  li {
    font-size: 1rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 1.5rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  img {
    aspect-ratio: 4/3;
    width: 100%;
    object-fit: cover;
  }
`;

const Button = styled.button`
  width: 8rem;
  padding: 0.5rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
  min-width: 30%;
`;

export default Recipe;
