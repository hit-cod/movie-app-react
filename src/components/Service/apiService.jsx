function fetchTrendingMovies() {
  return fetch(
    'https://api.themoviedb.org/3/trending/all/day?api_key=24f5ea62bdd66f55b56dc1c5afd596d8&language=en-US',
  ).then(res => res.json());
}

function fetchReuestedMovies(query) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=24f5ea62bdd66f55b56dc1c5afd596d8&language=en-US&page=1&query=${query}`,
  ).then(res => res.json());
}

function fetchBaseUrlForImg() {
  return fetch(
    `https://api.themoviedb.org/3/configuration?api_key=24f5ea62bdd66f55b56dc1c5afd596d8`,
  ).then(res => res.json());
}

function fetchMovieDetails(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=24f5ea62bdd66f55b56dc1c5afd596d8&language=en-US`,
  ).then(res => res.json());
}

function fetchMovieCast(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=24f5ea62bdd66f55b56dc1c5afd596d8&language=en-U`,
  ).then(res => res.json());
}

function fetchMovieReviews(movieId) {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=24f5ea62bdd66f55b56dc1c5afd596d8&language=en-US&page=1`,
      )
        .then(res => res.json())
  }

const API = {
  fetchTrendingMovies,
  fetchReuestedMovies,
  fetchBaseUrlForImg,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};

export default API;
