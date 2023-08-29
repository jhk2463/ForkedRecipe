import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar, AiOutlineHeart } from "react-icons/ai";

function GradientCard(props) {
  const handleSave = () => {
    if (props.isSaved) {
      return;
    }
    props.saveRecipe(props.id);
  };
  return (
    <Card>
      <Link to={`/recipe/${props.tag}/${props.id}`}>
        <p>{props.title}</p>
        <img src={props.image} alt={props.title} />
        <Gradient />
      </Link>
      <Sidebar id="sidebar">
        <SaveButton onClick={handleSave}>
          {props.isSaved ? (
            <AiFillStar style={{ color: "#ffd700" }} />
          ) : (
            <AiOutlineStar />
          )}
        </SaveButton>
        {/* <LikeButton>
          <AiOutlineHeart />
        </LikeButton> */}
      </Sidebar>
    </Card>
  );
}

const Card = styled.div`
  overflow: hidden;
  aspect-ratio: 4/3;
  img {
    display: block;
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
    transform: translate(-50%, 20%);
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
  &:hover #sidebar {
    transition: 0.3s;
    right: -1.4rem;
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

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  top: 0rem;
  width: 4rem;
  padding: 0.2rem;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px #dddddd;
  border-radius: 0.7rem;
  z-index: -1;

  right: 1rem;
  transition: 0.3s;
`;

const SaveButton = styled.button`
  border: none;
  background: transparent;
  svg {
    color: #5f5f5f;
    transform: scale(1.2);
  }
`;

const LikeButton = styled.button`
  border: none;
  background: transparent;
  svg {
    color: #5f5f5f;
    transform: scale(1.1);
  }
`;

export default GradientCard;
