import { useEffect, useState, lazy } from 'react';
import {
  useParams,
  useRouteMatch,
  NavLink,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';

import apiService from '../Service/apiService';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: 'Cast'*/));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: 'Reviews'*/),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  // set home address and query from previous page
  const [prevPage, setPrevPage] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    apiService
      .fetchMovieDetails(movieId)
      .then(movie => {
        const wasRequestSuccessful = movie.success === undefined;

        if (wasRequestSuccessful) setMovie(movie);
      })
      .catch(error => {
        console.log('error', error.message);
      });

    apiService
      .fetchBaseUrlForImg()
      .then(({ images }) => {
        setBaseUrl(images.base_url);
      })
      .catch(error => {
        console.log('img', error.message);
      });
  }, [movieId]);

  useEffect(() => {
    if (!location.state) {
      return history.push({
        pathname: `/`,
      });
    }
    setPrevPage(location.state.from);
    setQuery(location.state.query);
  }, [history, location.state, movieId]);

  const handleBackClick = () => {
    const prevPage = location.state.from.pathname;
    const query = location.state.query;

    if (prevPage === '/movies') {
      history.push({
        pathname: prevPage,
        search: `query=${query}`,
      });
    }

    if (prevPage === '/') history.push(prevPage);
  };

  const {
    poster_path,
    title,
    name,
    vote_avarage,
    overview,
    release_date,
    first_air_date,
    genres,
  } = movie;

  return (
    <div className={s.container}>
      <button type="button" onClick={handleBackClick} className={s.actionBtn}>
        Go back
      </button>
      {movie === '' && <p>Something went wrong. Please, try later.</p>}

      {movie && (
        <>
          <section className={s.movieDetails}>
            <div>
              <img src={`${baseUrl}w300/${poster_path}`} alt={title || name} />
            </div>
            <div>
              <h2>{title || name}</h2>
              <p>{vote_avarage}</p>

              <h3>Overview</h3>
              <p>{overview}</p>
              <p>Release Date: {release_date || first_air_date}</p>

              <h3>Genres</h3>
              <p>
                {genres &&
                  genres.map(({ id, name }) => <span key={id}>{name} </span>)}
              </p>
            </div>
          </section>

          <hr />

          <section>
            <h4>Additional information</h4>
            <ul className={s.addInfoList}>
              <li >
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      from: prevPage,
                      query: query,
                    },
                  }}
                >
                  <button type="button" className={s.actionBtn}>Cast</button>
                </NavLink>
              </li>

              <li >
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      from: prevPage,
                      query: query,
                    },
                  }}
                >
                  <button type="button" className={s.actionBtn}>Reviews</button>
                </NavLink>
              </li>
            </ul>

            
          </section>
          <hr />

          <Route
            path={`${path}/cast`}
            render={props => <Cast baseUrl={baseUrl} {...props} />}
          ></Route>

          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </>
      )}
    </div>
  );
}
