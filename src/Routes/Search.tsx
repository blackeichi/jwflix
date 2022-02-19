import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchMovie,
  getSearchTv,
  IGetMoviesResult,
  IGetTvsResult,
} from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 350px;
  align-items: center;
`;
const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-top: 100px;
`;
const Searchname = styled.p`
  font-size: 20px;
  width: 100%;
  text-align: center;
  margin-top: 200px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword") as string;
  const { data: movie, isLoading } = useQuery<IGetMoviesResult>(
    ["searchs", "searchMovie"],
    () => getSearchMovie(keyword)
  );
  const { data: tv } = useQuery<IGetTvsResult>(["searchs", "searchMovie"], () =>
    getSearchTv(keyword)
  );
  console.log(movie);
  console.log(tv);
  return (
    <>
      <Searchname>"{keyword}" 검색결과 </Searchname>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <Title>Movies</Title>
          <hr style={{ width: "100%" }} />
          <Wrapper>
            {isLoading ? (
              <h1>Loading....</h1>
            ) : (
              <>
                {movie?.results.map((search) => (
                  <Box>
                    <motion.img
                      src={makeImagePath(search.poster_path, "w200")}
                      style={{
                        objectFit: "cover",
                        width: "200px",
                        height: "300px",
                        marginBottom: "7px",
                      }}
                    ></motion.img>
                    <h2>{search.original_title}</h2>
                  </Box>
                ))}
              </>
            )}
          </Wrapper>
          <Title>Tv shows</Title>
          <hr style={{ width: "100%" }} />
          <Wrapper>
            <>
              {tv?.results.map((tvshows) => (
                <Box>
                  <motion.img
                    src={makeImagePath(tvshows.poster_path, "w200")}
                    style={{
                      objectFit: "cover",
                      width: "200px",
                      height: "300px",
                      marginBottom: "7px",
                    }}
                  ></motion.img>
                  <h2>{tvshows.name}</h2>
                </Box>
              ))}
            </>
          </Wrapper>
        </>
      </div>
    </>
  );
}

export default Search;
