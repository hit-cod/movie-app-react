import { Link } from 'react-router-dom';

export default function MovieList({ movies }) {
  return movies.map(({ id, title, name }) => {
    return (
      <li key={id}>
        <Link to={`/movies/${id.toString()}`}>{title || name}</Link>
      </li>
    );
  });
}
