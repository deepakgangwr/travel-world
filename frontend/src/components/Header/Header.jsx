import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active__link" : "")}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-5">
                <Button
                  className={`btn secondary__btn ${location.pathname === "/login" ? "active__btn" : ""}`}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  className={`btn primary__btn ${location.pathname === "/register" ? "active__btn" : ""}`}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
              <span className="mobile__menu">
                <i className="ri-more-2-fill"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
