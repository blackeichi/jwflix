const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "4bc5f53a3e7b9a35ef5fbd55f9f2b964";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

export interface IGetTheMovie {
  adult: boolean;
  backdrop_path: string;
  gener: [name: string];
  overview: string;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json(),
  );
}

export function getTheMovie(ThemovieId: string) {
  return fetch(`${BASE_PATH}/movie/${ThemovieId}?api_key=${API_KEY}`).then(
    (response) => response.json,
  );
}
