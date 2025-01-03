import React from "react";
import { NavLink } from "react-router-dom";

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
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/shows"
              >
                TV Shows
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
