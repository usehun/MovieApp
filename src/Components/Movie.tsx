import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContentBox = styled.ul`
  margin: 0 10vw;
  height: 100vh;
`;

const Box3D = styled.div<{ degreeY: number }>`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
  transform: ${(props) => `rotateY(${props.degreeY}deg)`};
  //  translateZ(500px)
  //   scale(0.5);
`;

const ImgSize = 300;

const ImgBox = styled.li`
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: ${ImgSize}px;
  height: 500px;
  margin: -250px 0 0 -150px;
  opacity: 0.5;
  transform-style: preserve-3d;
  transition: 0.3s;
  perspective: 500px;
`;

const ContentItem = styled.li`
  position: relative;
  top: 25vh;
`;

const Content = styled.div<{ fontSize?: string; padding?: string }>`
  font-size: ${(props) => props.fontSize};
  color: whitesmoke;
  position: relative;
  padding: ${(props) => props.padding};
  z-index: 10;
`;

const ContentImg = styled.img<{ rotateY: number; dist: number; scale: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: ${(props) => `rotateY(${props.rotateY}deg)`}
    ${(props) => `translateZ(${props.dist}px)`}
    ${(props) => `scale(${props.scale})`};
  transition: linear 0.3s;
`;

const ContentGenre = styled.ul`
  display: flex;
`;

const ContentBtn = styled(Content)`
  background-color: whitesmoke;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-weight: bold;
`;

interface MovieProps {
  id: number;
  coverImg: string;
  title: string;
  overview: string;
  genre_Codes: Array<object>;
  genre_ids: Array<number>;
  vote_average: number;
  imgCnt: Array<number>;
  imgDegree: number;
}

interface GenreCodeProps {
  id?: number;
  name?: string;
}

interface entriesProps {
  isIntersecting: boolean;
  target: object;
}

function Movie({
  id,
  coverImg,
  title,
  overview,
  genre_Codes,
  genre_ids,
  vote_average,
  imgCnt,
  imgDegree,
}: MovieProps) {
  // const [imgCount, setImgCount] = useState(0);
  // const [dist, setDist] = useState(0);
  // const [degree, setDegree] = useState(0);

  // useEffect(() => {
  //   setImgCount({ imgCnt }.imgCnt.length); // 20
  //   setDist(ImgSize / 2 / Math.tan((2 * Math.PI) / imgCount / 2));
  //   setDegree({ imgDegree }.imgDegree * (360 / imgCount));
  // }, [imgCount, dist, degree]);

  let imgCount = { imgCnt }.imgCnt.length;
  let dist = ImgSize / 2 / Math.tan((2 * Math.PI) / imgCount / 2);
  let degree = { imgDegree }.imgDegree * (360 / imgCount);

  const prevPageY = useRef(0);
  const scrollDirection = useRef("");

  useEffect(() => {
    function scrollEvent() {
      // console.log(prevPageY.current);
      if (prevPageY.current > window.scrollY) {
        scrollDirection.current = "Up";
        // console.log(prevPageY.current);
        // console.log(scrollDirection.current);
      } else {
        scrollDirection.current = "Down";
        // console.log(prevPageY.current);
        // console.log(scrollDirection.current);
      }
      prevPageY.current = window.scrollY;
    }

    window.addEventListener("scroll", scrollEvent);
  }, []);
  // console.log(scrollDirection.current);

  const [visible, setvisible] = useState(false);
  const panelIndex = useRef(null); // 보이는 화면 전체 가져오기
  const currentPanel = useRef(0); // 1~20
  const panelY = useRef(0); // 패널 회전
  const panelpanel = useRef(null);

  useEffect(() => {
    const observerHandle = (entries: entriesProps | any) => {
      // console.log(panelIndex.current);
      // console.log(entries[0].target);
      if (entries[0].isIntersecting === true) {
        // console.log(entries[0].target);
        setvisible(true);
        if (visible === true && scrollDirection.current === "Up") {
          currentPanel.current = parseInt(entries[0].target.dataset.index) + 1;
          panelY.current = (360 / imgCount) * currentPanel.current;
          // console.log(currentPanel);
          return panelY;
        } else {
          currentPanel.current = parseInt(entries[0].target.dataset.index);
          panelY.current = (360 / imgCount) * currentPanel.current;
          // console.log(currentPanel);
          // console.log(entries[0]);
          // console.log(entries[0].isIntersecting);

          // console.log(currentPanel);
          // console.log(panelY);

          return panelY;
        }
      }

      setvisible(false);
      // console.log(currentPanel);
      // console.log(currentPanel);
    };
    const Io = new IntersectionObserver(observerHandle);

    if (panelIndex.current) {
      Io.observe(panelIndex.current);
      // console.log(panelIndex.current);
    }

    // const observerHandle2 = (entries: any) => {
    //   // console.log(entries);
    // };

    // const Io2 = new IntersectionObserver(observerHandle2);
    // if (panelpanel.current) {
    //   Io2.observe(panelpanel.current);
    // }
    console.log(panelpanel.current);
  }, [panelY.current]);

  // console.log(panelY.current);

  // console.log(panelY);

  // const Io = new IntersectionObserver(
  //   (entries: IntersectionObserverEntry[], observer) => {
  // // console.log(panelIndex.current);
  // entries.map((e: entriesProps | any) => {
  //   console.log(e);
  //   // console.log(e.isIntersecting);
  //   if (e.isIntersecting === true) {
  //     if (scrollDirection.current === "Up") {
  //       setCurrentPanel(parseInt(e.target.dataset.index) + 1);
  //       // console.log(currentPanel.current);
  //       setPanelY((360 / imgCount) * currentPanel);
  //       console.log(currentPanel);
  //       // console.log(currentPanel);

  //       return panelY;
  //     } else {
  //       // console.log(e.target.dataset);
  //       setCurrentPanel(parseInt(e.target.dataset.index));
  //       // console.log(e.target.dataset.index);
  //       // console.log(currentPanel.current);
  //       setPanelY((360 / imgCount) * currentPanel);
  //       console.log(currentPanel);
  //       // console.log(currentPanel);

  //       return panelY;
  //     }
  //   }
  // });
  //   },
  //   { threshold: 0.9 }
  // );

  // console.log(panelY);
  // console.log(currentPanel.current);
  // return Io.observe(panelIndex.current);

  // setPanelY((360 / imgCount) * currentIndex);

  // console.log(rotateYY);
  // console.log(genre_ids);
  // console.log(genre_Codes);

  // function Ready(e: any) {
  //   Io.observe(e.currentTarget);
  //   console.log(e);
  //   return;
  // }

  return (
    <div>
      <ul className="observer-start observer-ready"></ul>
      <ContentBox
        className={`observer-ready ${visible}`}
        data-index={imgDegree}
        ref={panelIndex}
      >
        <ImgBox>
          <Box3D degreeY={degree}>
            <ContentImg
              src={`http://image.tmdb.org/t/p/w500/${coverImg}`}
              alt={title}
              rotateY={panelY.current}
              ref={panelpanel}
              dist={imgCount * 22}
              // scale={0.15}
              scale={imgCount * 0.0075}
            ></ContentImg>
          </Box3D>
        </ImgBox>

        <ContentItem>
          <Content as="h2" fontSize="40px" padding="20px 0 20px 0">
            {title}
          </Content>
          <Content as="p" fontSize="30px">
            {overview}
          </Content>
          <ContentGenre>
            {genre_Codes.map((genreCode: GenreCodeProps) =>
              genre_ids.map((genre: number) =>
                genre === genreCode.id ? (
                  <Content as="li" fontSize="20px" key={genre}>
                    {genreCode.name}
                  </Content>
                ) : (
                  ""
                )
              )
            )}
          </ContentGenre>
          <Content as="p" fontSize="20px">
            {vote_average}
          </Content>
          <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
            <ContentBtn as="button">Detail</ContentBtn>
          </Link>
        </ContentItem>
      </ContentBox>
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
