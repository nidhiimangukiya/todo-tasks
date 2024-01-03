import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand font-italic" to="/">TaskTrack</Link>
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
              <Link className="nav-link font-italic " to="/">Todo-Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-italic " to="/completed">Completed-Tasks</Link>
            </li>
          </ul>
      </div>
    </nav>
  );
}

export default NavBar;