const API_KEY = "4bc5f53a3e7b9a35ef5fbd55f9f2b964";

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function makeCompanyImg(id: string) {
  return `https://api.themoviedb.org/3/company/${id}/images?api_key=${API_KEY}`;
}
