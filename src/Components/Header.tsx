import styled from "styled-components";
import { Link } from "react-router-dom";

const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 1.5vw;
  height: 10vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: red;
  font-weight: bold;
  background-color: black;
  border: none;
`;

const NavGroup = styled.ul`
  display: flex;
  flex-wrap: nowrap;
`;

const NavList = styled.li`
  display: flex;
  font-size: 1.2rem;
  margin: 0 0.5rem 0 0.5rem;
  color: red;
`;

function Header() {
  return (
    <div>
      <Head>
        {/* <Link to={`/`}> */}
        <Title as="button">Netflix</Title>
        {/* </Link> */}

        <NavGroup>
          <NavList>Popular</NavList>
          <NavList>Top Rated</NavList>
          <NavList>Upcoming</NavList>
        </NavGroup>
      </Head>
    </div>
  );
}

export default Header;
