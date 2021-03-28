import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import apiService from '../Service/apiService';
import s from './Cast.module.css';

export default function Cast({ baseUrl }) {
  const { movieId } = useParams();
  const [mainCast, setMainCast] = useState('');

  useEffect(() => {
    apiService
      .fetchMovieCast(movieId)
      .then(({ cast }) => {
        const otherActors = cast.length - 7;
        setMainCast(cast.splice(0, cast.length - otherActors));
      })
      .catch(error => {
        console.log('error', error.message);
      });
  }, [movieId]);

  return (
    <>
      {mainCast && (
        <ul>
          {mainCast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={s.castItem}>
              {profile_path && (
                <img
                  src={`${baseUrl}w154/${profile_path.slice(1)}`}
                  alt={name}
                />
              )}
              <div>
                <p>{name}</p>
                <p>Character: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
