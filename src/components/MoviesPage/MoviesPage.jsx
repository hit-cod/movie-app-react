import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import apiService from '../Service/apiService';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchedFilms, setSearchedFilms] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleInput = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    history.push({
      search: `query=${query}`,
    });

    apiService
      .fetchReuestedMovies(query)
      .then(({ results }) => {
        setSearchedFilms(results);
      })
      .finally(() => {
        e.target[0].value = '';
      });
  };

  useEffect(() => {
    if (!location.search) return;

    const savedQuery = new URLSearchParams(location.search).get('query');

    apiService.fetchReuestedMovies(savedQuery).then(({ results }) => {
      setSearchedFilms(results);
    });

    setQuery(savedQuery);
  }, [location.search]);

  return (
    <div className={s.container}>
      <form action="" onSubmit={handleSubmit} className={s.searchForm}>
        <input type="text" onChange={handleInput} className={s.searchInput} />
        <button type="submit" className={s.searchBtn}>
          Search
        </button>
      </form>

      {searchedFilms && (
        <ul className={s.moviesList}>
          {searchedFilms.map(({ id, title, name }) => (
            <li key={id} className={s.movieItem}>
              <Link
                to={{
                  pathname: `/movies/${id.toString()}`,
                  state: {
                    from: location,
                    query: query,
                  },
                }}
                className={s.movieLink}
              >
                {title || name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
