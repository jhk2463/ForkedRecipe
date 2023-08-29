import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiTacos } from "react-icons/gi";
import { BiSolidBowlRice, BiSolidSushi } from "react-icons/bi";
import { MdTakeoutDining } from "react-icons/md";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/american"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/mexican"}>
        <GiTacos />
        <h4>Mexican</h4>
      </SLink>
      <SLink to={"/cuisine/korean"}>
        <BiSolidBowlRice />
        <h4>Korean</h4>
      </SLink>
      <SLink to={"/cuisine/chinese"}>
        <MdTakeoutDining />
        <h4>Chinese</h4>
      </SLink>
      <SLink to={"/cuisine/japanese"}>
        <BiSolidSushi />
        <h4>Japanese</h4>
      </SLink>
      <SLink to={"/cuisine/thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  border-radius: 50%;
  margin-right: 1rem;
  padding-top: 0.5rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;

  h4 {
    color: white;
    font-size: 0.5rem;
  }
  svg {
    color: white;
    font-size: 0.9rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }
`;

export default Category;
