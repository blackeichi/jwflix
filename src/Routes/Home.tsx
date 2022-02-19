import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  getPopularMovies,
  getTheMovie,
  getTopMovies,
  IGetMoviesResult,
} from "../api";
import { makeImagePath, makeCompanyImg } from "../utils";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  height: 200vh;
  width: 100%;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 50px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  margin-top: 20px;
`;
const Rowname = styled.h2`
  position: relative;
  left: 20px;
  font-size: 15px;
  font-weight: 700;
`;
const Slider = styled(motion.div)`
  position: relative;
  width: 100%;
  bottom: 170px;
  display: flex;
  flex-direction: column;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  gap: 5px;
  width: 100%;
  padding-left: 20px;
`;
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  img {
    width: 100%;
    height: 200px;
  }
`;

const RowBox = styled(motion.div)`
  position: absolute;
  right: 0;
  width: 50px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const RowButton = styled(motion.svg)`
  width: 20px;
`;
const Info = styled(motion.div)`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  width: 100%;
  position: relative;
  bottom: 5px;
  display: flex;
  justify-content: center;
  h4 {
    text-align: center;
    font-size: 13px;
    width: 90%;
  }
  svg {
    position: absolute;
    left: 3px;
    width: 20px;
    cursor: pointer;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  position: relative;
  .coverContent {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: absolute;
    bottom: 0;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  font-weight: 700;
`;

const BigOverview = styled.p`
  padding: 0 20px;
  margin: 20px 0;
  margin-top: 40px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  p {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 5px;
    text-align: center;
  }
`;
const Bigrate = styled.div`
  padding: 0 20px;
  color: ${(props) => props.theme.white.lighter};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: tomato;
  border-radius: 50px;
  font-weight: 800;
`;
const Biginfo = styled.div`
  padding: 10px 10px;

  p {
    margin-bottom: 5px;
  }
`;
const Bigdate = styled.p``;
const Bigruntime = styled.p``;
const Bigvote = styled.p``;
const Bigproductor = styled.div`
  color: ${(props) => props.theme.white.lighter};
  div {
    padding: 5px 0;
    display: flex;
    align-items: center;
    p {
      margin-right: 20px;
    }
  }
`;
const CompayLogo = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  background-color: white;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -90,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 5;

function Home() {
  const history = useHistory();
  const theMovieId = useParams<{ movieId: string }>();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: popularMovie, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["popularMovies", "Popular"], getPopularMovies);
  const { data: topMovie, isLoading: topLoading } = useQuery<IGetMoviesResult>(
    ["topMovies", "Top"],
    getTopMovies
  );

  const { scrollY } = useViewportScroll();
  const [rowHovered, setrowHovered] = useState(false);
  const [rowHovered2, setrowHovered2] = useState(false);
  const [rowHovered3, setrowHovered3] = useState(false);
  const toggleRowHover = () => {
    setrowHovered((prev) => !prev);
  };
  const toggleRowHover2 = () => {
    setrowHovered2((prev) => !prev);
  };
  const toggleRowHover3 = () => {
    setrowHovered3((prev) => !prev);
  };

  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const increaseIndex = () => {
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increaseIndex2 = () => {
    if (data) {
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex2((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increaseIndex3 = () => {
    if (data) {
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex3((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxOpen = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  const clickedMovie2 =
    bigMovieMatch?.params.movieId &&
    popularMovie?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );
  const clickedMovie3 =
    bigMovieMatch?.params.movieId &&
    topMovie?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );
  //bigmoviematch가 true라면 data.result를 탐색
  const { data: movieDetail, isLoading: movieLoading } = useQuery(
    ["clickedMovie", theMovieId.movieId],
    () => getTheMovie(theMovieId.movieId)
  );

  const onOverlayClick = () => history.push("/jwflix");
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {/*------------row1-------------*/}
          <Rowname style={{ top: "-180px" }}>Now Playing</Rowname>
          <Slider onHoverStart={toggleRowHover} onHoverEnd={toggleRowHover}>
            <AnimatePresence initial={false}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                    >
                      <motion.img
                        src={makeImagePath(movie.backdrop_path, "w500")}
                        style={{ objectFit: "cover" }}
                      ></motion.img>
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                        <svg
                          onClick={() => onBoxOpen(movie.id)}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="arrow-alt-circle-down"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z"
                          ></path>
                        </svg>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            {rowHovered === true ? (
              <RowBox>
                <RowButton
                  onClick={increaseIndex}
                  layoutId="rowbtn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="svg-inline--fa fa-chevron-right fa-w-10 fa-3x"
                >
                  <path
                    fill="white"
                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                  ></path>
                </RowButton>
              </RowBox>
            ) : null}
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                ></Overlay>
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    top: scrollY.get() + 200,
                    position: "absolute",
                    width: "500px",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      >
                        <div className="coverContent">
                          <BigTitle>{clickedMovie.title}</BigTitle>
                          <Bigrate>
                            {movieDetail?.adult ? (
                              <span>19</span>
                            ) : (
                              <span>15</span>
                            )}
                          </Bigrate>
                        </div>
                      </BigCover>
                      <BigOverview>
                        <p>Overview</p> {clickedMovie.overview}
                      </BigOverview>
                      <hr />
                      <Biginfo>
                        <>
                          <Bigdate>
                            개봉일자 : {movieDetail?.release_date}
                          </Bigdate>

                          <Bigruntime>
                            러닝타임 : {movieDetail?.runtime} 분
                          </Bigruntime>
                          <Bigvote>
                            평점 : {movieDetail?.vote_average} 점
                          </Bigvote>
                          <Bigproductor>
                            제작사 :
                            {movieDetail?.production_companies.map(
                              (company: any) => (
                                <div>
                                  <p>◾ {company?.name}</p>
                                  {company.logo_path ? (
                                    <CompayLogo
                                      src={makeImagePath(company?.logo_path)}
                                    />
                                  ) : null}
                                </div>
                              )
                            )}
                          </Bigproductor>
                        </>
                      </Biginfo>
                    </>
                  )}
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
          {/*------------row2-------------*/}
          <Rowname style={{ top: "100px" }}>Popular Movie</Rowname>
          <Slider
            style={{ top: "110px" }}
            onHoverStart={toggleRowHover2}
            onHoverEnd={toggleRowHover2}
          >
            <AnimatePresence initial={false}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index2}
              >
                {popularMovie?.results
                  .slice(offset * index2, offset * index2 + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                    >
                      <motion.img
                        src={makeImagePath(movie.backdrop_path, "w500")}
                        style={{ objectFit: "cover" }}
                      ></motion.img>
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                        <svg
                          onClick={() => onBoxOpen(movie.id)}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="arrow-alt-circle-down"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z"
                          ></path>
                        </svg>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            {rowHovered2 === true ? (
              <RowBox>
                <RowButton
                  onClick={increaseIndex2}
                  layoutId="rowbtn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="svg-inline--fa fa-chevron-right fa-w-10 fa-3x"
                >
                  <path
                    fill="white"
                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                  ></path>
                </RowButton>
              </RowBox>
            ) : null}
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                ></Overlay>
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    zIndex: 1,
                    top: scrollY.get() + 100,
                    position: "absolute",
                    width: "500px",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}
                >
                  {clickedMovie2 && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie2.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      >
                        <div className="coverContent">
                          <BigTitle>{clickedMovie2.title}</BigTitle>
                          <Bigrate>
                            {movieDetail?.adult ? (
                              <span>19</span>
                            ) : (
                              <span>15</span>
                            )}
                          </Bigrate>
                        </div>
                      </BigCover>
                      <BigOverview>
                        <p>Overview</p> {clickedMovie2.overview}
                      </BigOverview>
                      <hr />
                      <Biginfo>
                        <>
                          <Bigdate>
                            개봉일자 : {movieDetail?.release_date}
                          </Bigdate>

                          <Bigruntime>
                            러닝타임 : {movieDetail?.runtime} 분
                          </Bigruntime>
                          <Bigvote>
                            평점 : {movieDetail?.vote_average} 점
                          </Bigvote>
                          <Bigproductor>
                            제작사 :
                            {movieDetail?.production_companies.map(
                              (company: any) => (
                                <div>
                                  <p>◾ {company?.name}</p>
                                  {company.logo_path ? (
                                    <CompayLogo
                                      src={makeImagePath(company?.logo_path)}
                                    />
                                  ) : null}
                                </div>
                              )
                            )}
                          </Bigproductor>
                        </>
                      </Biginfo>
                    </>
                  )}
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
          {/*------------row3-------------*/}
          <Rowname style={{ top: "380px" }}>Top Rated Movie</Rowname>
          <Slider
            style={{ top: "390px" }}
            onHoverStart={toggleRowHover3}
            onHoverEnd={toggleRowHover3}
          >
            <AnimatePresence initial={false}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index3}
              >
                {topMovie?.results
                  .slice(offset * index3, offset * index3 + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                    >
                      <motion.img
                        src={makeImagePath(movie.backdrop_path, "w500")}
                        style={{ objectFit: "cover" }}
                      ></motion.img>
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                        <svg
                          onClick={() => onBoxOpen(movie.id)}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="arrow-alt-circle-down"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z"
                          ></path>
                        </svg>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            {rowHovered3 === true ? (
              <RowBox>
                <RowButton
                  onClick={increaseIndex3}
                  layoutId="rowbtn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="svg-inline--fa fa-chevron-right fa-w-10 fa-3x"
                >
                  <path
                    fill="white"
                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                  ></path>
                </RowButton>
              </RowBox>
            ) : null}
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                ></Overlay>
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    top: scrollY.get() + 200,
                    position: "absolute",
                    width: "500px",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}
                >
                  {clickedMovie3 && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie3.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      >
                        <div className="coverContent">
                          <BigTitle>{clickedMovie3.title}</BigTitle>
                          <Bigrate>
                            {movieDetail?.adult ? (
                              <span>19</span>
                            ) : (
                              <span>15</span>
                            )}
                          </Bigrate>
                        </div>
                      </BigCover>
                      <BigOverview>
                        <p>Overview</p> {clickedMovie3.overview}
                      </BigOverview>
                      <hr />
                      <Biginfo>
                        <>
                          <Bigdate>
                            개봉일자 : {movieDetail?.release_date}
                          </Bigdate>

                          <Bigruntime>
                            러닝타임 : {movieDetail?.runtime} 분
                          </Bigruntime>
                          <Bigvote>
                            평점 : {movieDetail?.vote_average} 점
                          </Bigvote>
                          <Bigproductor>
                            제작사 :
                            {movieDetail?.production_companies.map(
                              (company: any) => (
                                <div>
                                  <p>◾ {company?.name}</p>
                                  {company.logo_path ? (
                                    <CompayLogo
                                      src={makeImagePath(company?.logo_path)}
                                    />
                                  ) : null}
                                </div>
                              )
                            )}
                          </Bigproductor>
                        </>
                      </Biginfo>
                    </>
                  )}
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
