import React from "react";
import { Link } from "react-router-dom";
import Shows from "./TvShows";

function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <a href="/">FLIXX</a>
        </div>
        <nav>
          <ul>
            <li>
              <Link className="nav-link active" to="/">
                Movies
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/shows">
                TV Shows
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
