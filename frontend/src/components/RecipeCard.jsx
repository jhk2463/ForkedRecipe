import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

function RecipeCard(props) {
  return (
    <Card>
      <Link to={`/recipe/${props.id}`}>
        <img src={props.image} alt={props.title} />
        <h4>{props.title}</h4>
      </Link>
    </Card>
  );
}

const Card = styled.div`
  max-width: 20rem;
  max-height: 20rem;
  img {
    width: 100%;
    height: 70%;
    border-radius: 2rem;
    object-fit: cover;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default RecipeCard;
