import { useEffect, useState } from "react";
import Movie from "../Components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genreCodes, setGenreCodes] = useState([]);
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGViYTk2MzNjNmJkYmY2MjJhYTY5MzJmZGVkMTVjYyIsInN1YiI6IjY0ZTcxODliMWZlYWMxMDBlMTY5NDUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c-stEKteGgGN0jSwv8GsHTH_YHVsRlT9WAlTLS_p_O8",
  //     },
  //   };

  const API_KEY = "e0eba9633c6bdbf622aa6932fded15cc";
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`,
      []
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setGenreCodes(json.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
      []
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setMovies(json.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  //   console.log(genreCodes);
  //   console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              coverImg={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              genre_Codes={genreCodes}
              genre_ids={movie.genre_ids}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
