import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../Service/apiService';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState('');
  const location = useLocation();

  useEffect(() => {
    apiService.fetchTrendingMovies().then(({ results }) => {
      const moviesWithTitle = results.filter(movie => movie.title);
      setMovies(moviesWithTitle);
    });
  }, []);
  return (
    <div className={s.container}>
      <h2 className={s.title}>Trending movies of the day</h2>
      <ul className={s.moviesList}>
        {movies &&
          movies.map(({ id, title, name }) => (
            <li key={id} className={s.movieItem}>
              <Link
                to={{
                  pathname: `/movies/${id.toString()}`,
                  state: {
                    from: location,
                  },
                }}
                className={s.movieLink}
              >
                {title || name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
