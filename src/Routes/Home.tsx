import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  background: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
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
const Slider = styled(motion.div)`
  position: relative;
  bottom: 170px;
  display: flex;
  flex-direction: column;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
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
  z-index: 1;
`;

const RowButton = styled(motion.svg)`
  width: 20px;
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
const MovieTitle = styled(motion.h5)`
  position: absolute;
  bottom: 0px;
  color: ${(props) => props.theme.white.darker};
  font-weight: 800;
`;
const movietitleVariants = {
  hover: {
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0,
    },
  },
};
const Info = styled(motion.div)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  width: 100%;
  position: relative;
  bottom: 5px;
  h4 {
    text-align: center;
    font-size: 15px;
  }
`;
const offset = 5;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [rowHovered, setrowHovered] = useState(false);
  const toggleRowHover = () => {
    setrowHovered((prev) => !prev);
  };

  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
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
                      //bgPhoto={makeImagePath(movie.backdrop_path, "w400")}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                    >
                      <motion.img
                        src={makeImagePath(movie.backdrop_path, "w500")}
                        style={{ objectFit: "cover" }}
                      ></motion.img>
                      <MovieTitle variants={movietitleVariants}>
                        {movie.title}
                      </MovieTitle>
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
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
        </>
      )}
    </Wrapper>
  );
}
export default Home;
