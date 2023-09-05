import PropTypes from "prop-types";
import ContentCss from "../CSS/Content.module.css";

function Content({
  id,
  cover_img,
  title,
  overview,
  release_date,
  genres,
  runtime,
  bg_img,
}) {
  return (
    <div className={ContentCss.bg} key={id}>
      <img
        src={`http://image.tmdb.org/t/p/w500/${cover_img}`}
        alt={title}
      ></img>
      <h2>{title}</h2>
      <p>{overview}</p>
      <p>{release_date}</p>
      <ul>
        {genres.map((g) => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
      <p>{runtime}</p>
      <img src={`http://image.tmdb.org/t/p/w500/${bg_img}`}></img>
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
