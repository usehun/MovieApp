import { useEffect, useState } from "react";
import Movie from "../Components/Movie";

interface MoviesProps {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids: Array<number>;
  vote_average: number;
}

interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids: Array<number>;
  vote_average: number;
}

interface GenreCodesProps {
  id: number;
  name: string;
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [genreCodes, setGenreCodes] = useState<GenreCodesProps[]>([]);
  // const [imgDegree, setImgDegree] = useState([]);
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
      [] as any
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
      [] as any
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setMovies(json.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(genreCodes);
  useEffect(() => {});
  let imgCnt: number[] = []; // 20
  let imgDegree: number[] = []; // 각각 1~20
  for (let i = 0; i < movies.length; i++) {
    imgCnt.push(i);
    imgDegree.push(i);
  }

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie: MovieProps, imgDegree: number) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              genre_Codes={genreCodes}
              genre_ids={movie.genre_ids}
              vote_average={movie.vote_average}
              imgCnt={imgCnt}
              imgDegree={imgDegree}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
