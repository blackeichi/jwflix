import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getOntheair,
  getPopularTv,
  getTopratedTv,
  IGetTvsResult,
} from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 120vh;
  background-color: inherit;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const BgInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
`;
const BgInfo_title = styled.h1`
  font-size: 50px;
`;
const BgInfo_overview = styled.p`
  font-size: 20px;
  margin-top: 20px;
  width: 50%;
`;
const Rowname = styled.div`
  padding-left: 20px;
  position: relative;
  top: -180px;
  font-weight: 700;
`;
const Slider = styled(motion.div)`
  width: 100%;
  position: relative;
  bottom: 170px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  width: 100%;
  padding-left: 20px;
  position: absolute;
`;
const Box = styled(motion.div)`
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
const Rowbox = styled(motion.div)`
  width: 50px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: -200px;
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

const Biginfo = styled.div`
  padding: 10px 10px;

  p {
    margin-bottom: 5px;
  }
`;
const Bigdate = styled.p``;
const Bigruntime = styled.p``;
const Bigvote = styled.p``;

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

function Tv() {
  const { data: onairtv, isLoading: onairLoading } = useQuery<IGetTvsResult>(
    ["tv", "onAir"],
    getOntheair
  );
  console.log(onairtv);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (onairtv) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = onairtv?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const [rowHovered, setrowHovered] = useState(false);

  const toggleRowHover = () => {
    setrowHovered((prev) => !prev);
  };

  const history = useHistory();
  const ClickedMatch = useRouteMatch<{ TvId: string }>("/jwflix/tv/:TvId");
  const onBoxOpen = (TvId: number) => {
    history.push(`/jwflix/tv/${TvId}`);
  };
  const onOverlayClick = () => history.push("/jwflix/tv");
  const { scrollY } = useViewportScroll();
  const clickedTv =
    ClickedMatch?.params.TvId &&
    onairtv?.results.find((Tv) => Tv.id === +ClickedMatch.params.TvId);
  return (
    <Wrapper>
      {onairLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onairtv?.results[0].backdrop_path || "")}
          >
            <BgInfo>
              <BgInfo_title>{onairtv?.results[0].name}</BgInfo_title>
              <BgInfo_overview>{onairtv?.results[0].overview}</BgInfo_overview>
            </BgInfo>
          </Banner>
          <Rowname>On air TV shows</Rowname>
          <Slider onHoverStart={toggleRowHover} onHoverEnd={toggleRowHover}>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {onairtv?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((onAir) => (
                    <Box
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      key={onAir.id}
                    >
                      {onAir.backdrop_path === null ? (
                        <p
                          style={{
                            height: "200px",
                            backgroundColor: "black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Can't find image
                        </p>
                      ) : (
                        <motion.img
                          src={makeImagePath(onAir.backdrop_path, "w500")}
                          style={{ objectFit: "cover" }}
                        ></motion.img>
                      )}

                      <Info variants={infoVariants}>
                        <h4>{onAir.name}</h4>
                        <svg
                          onClick={() => onBoxOpen(onAir.id)}
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
            {rowHovered ? (
              <Rowbox>
                <RowButton
                  onClick={increaseIndex}
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
              </Rowbox>
            ) : null}
          </Slider>
          <AnimatePresence>
            {ClickedMatch ? (
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
                  {clickedTv ? (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      >
                        <div className="coverContent">
                          <BigTitle>{clickedTv.name}</BigTitle>
                        </div>
                      </BigCover>
                      <BigOverview>
                        <p>Overview</p> {clickedTv.overview}
                      </BigOverview>
                      <hr />
                      <Biginfo>
                        <>
                          <Bigdate>인기도 : {clickedTv?.popularity}</Bigdate>

                          <Bigruntime>
                            첫 방영일 : {clickedTv?.first_air_date}
                          </Bigruntime>
                          <Bigvote>평점 : {clickedTv?.vote_average} 점</Bigvote>
                        </>
                      </Biginfo>
                    </>
                  ) : null}
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
