import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

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

const Slider = styled.div``;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
`;

const Title = styled.h2`
  font-size: 50px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  margin-top: 20px;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies,
  );

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
        </>
      )}
    </Wrapper>
  );
}
export default Home;
