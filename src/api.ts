const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "4bc5f53a3e7b9a35ef5fbd55f9f2b964";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  original_title: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export function getMovieImage(id: number) {
  return fetch(`${BASE_PATH}movie/${id}/images?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getSearchMovie(keyword: string) {
  return fetch(`
  ${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`).then(
    (response) => response.json()
  );
}

export function getTheMovie(theMovieId: string) {
  return fetch(`${BASE_PATH}/movie/${theMovieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

//--------------------------movie-----------------
export interface IGetTvsResult {
  page: number;
  results: [
    {
      poster_path: string;
      popularity: number;
      id: number;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      first_air_date: string;
      name: string;
    }
  ];
  total_pages: number;
  total_results: number;
}
export function getOntheair() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getTopratedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getSearchTv(keyword: string) {
  return fetch(`
  ${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`).then(
    (response) => response.json()
  );
}
