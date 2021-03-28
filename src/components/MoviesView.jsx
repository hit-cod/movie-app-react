import { Switch, Route } from 'react-router-dom';
import { lazy } from 'react';

// import AppBar from './Navigation/AppBar'

const AppBar = lazy(() => import('./Navigation/AppBar' /* webpackChunkName: 'AppBar'*/));
const HomePage = lazy(() => import('./HomePage/HomePage' /* webpackChunkName: 'HomePage'*/));
const MoviesPage = lazy(() => import('./MoviesPage/MoviesPage' /* webpackChunkName: 'MoviesPage'*/));
const MovieDetailsPage = lazy(() => import('./MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: 'MovieDetailsPage'*/));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage' /* webpackChunkName: 'NotFoundPage'*/));

export default function MoviesView() {
  return (
    <>
      <AppBar />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
    </>
  );
}
