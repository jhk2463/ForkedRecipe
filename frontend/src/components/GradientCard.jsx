import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

function GradientCard(props) {
  return (
    <Card>
      <Link to={`/recipe/${props.id}`}>
        <p>{props.title}</p>
        <img src={props.image} alt={props.title} />
        <Gradient />
      </Link>
    </Card>
  );
}

const Card = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  min-height: 10rem;

  img {
    border-radius: 2rem;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    height: 30%;
    text-align: center;
    font-weight: 400;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  border-radius: 2rem;
`;

export default GradientCard;
