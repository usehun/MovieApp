import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../Components/Content";

interface ContentProps {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  genres: Array<object>;
  runtime: number;
  backdrop_path: string;
}

function Detail() {
  const API_KEY = "e0eba9633c6bdbf622aa6932fded15cc";
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentProps>([] as any);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      [] as any
    )
      .then((response: Response) => response.json())
      .then((json) => {
        setContent(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(content);

  return (
    <div>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <div>
          <Content
            id={content.id}
            cover_img={content.poster_path}
            title={content.title}
            overview={content.overview}
            release_date={content.release_date}
            genres={content.genres}
            runtime={content.runtime}
            bg_img={content.backdrop_path}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
