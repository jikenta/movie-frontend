
import axios from 'axios';

const API_KEY = '90a35ae2b53146dc052895bdd295055a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return res.data.results;
};
export const getRecommendations = async (genreIds) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreIds.join(','),
    },
  });
  return res.data.results;
};