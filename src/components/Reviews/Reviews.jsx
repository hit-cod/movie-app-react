import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import apiService from '../Service/apiService';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // fetch(
    //   `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=24f5ea62bdd66f55b56dc1c5afd596d8&language=en-US&page=1`,
    // )
    //   .then(res => res.json())

    apiService.fetchMovieReviews(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);
  return (
    <>
      <ul>
        {reviews.length !== 0 ? (
          reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <p>Comment: {content}</p>
            </li>
          ))
        ) : (
          <p>No reviews for this film</p>
        )}
      </ul>
    </>
  );
}
