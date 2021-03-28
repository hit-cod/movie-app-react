import { NavLink } from 'react-router-dom';

import s from './AppBar.module.css';

export default function MoviesView() {
  return (
    <>
      <nav className={s.nav}>
        <ul className={s.navMenu}>
          <li className={s.navItem}>
            <NavLink
              exact
              to="/"
              style={{ textDecoration: 'none', }}
              activeClassName={s.activeNavLink}
            >
              Home
            </NavLink>
          </li>
          <li className={s.navItem}>
            <NavLink
              to="/movies"
              style={{ textDecoration: 'none' }}
              activeClassName={s.activeNavLink}
            >
              Movies
            </NavLink>
          </li>
        </ul>
        <hr />
      </nav>
    </>
  );
}
