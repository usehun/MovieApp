import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({
  id,
  coverImg,
  title,
  overview,
  genre_Codes,
  genre_ids,
  vote_average,
}) {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <img
          src={`http://image.tmdb.org/t/p/w500/${coverImg}`}
          alt={title}
        ></img>
        <h2>{title}</h2>
        <p>{overview}</p>
        <ul>
          {genre_Codes.map((genreCode) =>
            genre_ids.map((genre) =>
              genre === genreCode.id ? (
                <li key={genre}>{genreCode.name}</li>
              ) : (
                ""
              )
            )
          )}
        </ul>
        <p>{vote_average}</p>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  genre_Codes: PropTypes.arrayOf(PropTypes.object).isRequired,
  genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  vote_average: PropTypes.number.isRequired,
};

export default Movie;
