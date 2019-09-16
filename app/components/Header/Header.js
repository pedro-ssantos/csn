import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Inicial
          </Link>
          <Link className="router-link" to="/curso">
            Curso
          </Link>
          <Link className="router-link" to="/discente">
            Discente
          </Link>
          <Link className="router-link" to="/docente">
            Docente
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
