import PropTypes from "prop-types";
import styled from "styled-components";
// import ContentCss from "../CSS/Content.module.css";

const BG = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;

interface ContentProps {
  id: number;
  cover_img: string;
  title: string;
  overview: string;
  release_date: string;
  genres: Array<object>;
  runtime: number;
  bg_img: string;
}

function Content({
  id,
  cover_img,
  title,
  overview,
  release_date,
  genres,
  runtime,
  bg_img,
}: ContentProps) {
  return (
    <div key={id}>
      <BG src={`http://image.tmdb.org/t/p/original/${bg_img}`}></BG>
      <img
        src={`http://image.tmdb.org/t/p/w500/${cover_img}`}
        alt={title}
      ></img>
      <h2>{title}</h2>
      <p>{overview}</p>
      <p>{release_date}</p>
      <ul>
        {genres.map((g: any) => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
      <p>{runtime}</p>
    </div>
  );
}

Content.propTypes = {
  id: PropTypes.number.isRequired,
  cover_img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  runtime: PropTypes.number.isRequired,
};

export default Content;
