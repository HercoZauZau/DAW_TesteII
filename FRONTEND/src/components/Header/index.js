/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav, UserStatus, Main } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.user.nome);
  const surname = useSelector((state) => state.auth.user.sobrenome);
  const userId = useSelector((state) => state.auth.user.id);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());

    history.push('/');
  };

  return (
    <Main>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400"
          rel="stylesheet"
        />
        <link href="/css/templatemo-style.css" rel="stylesheet" />
      </head>

      <body>
        <div className="container">
          <div className="placeholder">
            <div
              className="parallax-window"
              data-parallax="scroll"
              data-image-src="/img/simple-house-01.jpg"
            >
              <div className="tm-header">
                <div className="row tm-header-inner">
                  <div className="col-md-6 col-12">
                    <img
                      src="/img/simple-house-logo.png"
                      alt="Logo"
                      className="tm-site-logo"
                    />
                    <div className="tm-site-text-box">
                      <h1 className="tm-site-title">EatExplorer Inc.</h1>
                      <h6 className="tm-site-description">
                        avalie restaurantes
                      </h6>
                    </div>
                  </div>
                  <nav className="col-md-6 col-12 tm-nav">
                    <ul className="tm-nav-ul">
                      <li className="tm-nav-li">
                        <Link className="tm-nav-link" to="/">
                          <span>Home</span>
                        </Link>
                      </li>

                      <li className="tm-nav-li">
                        {isLoggedIn ? (
                          <Link
                            className="tm-nav-link"
                            to={`/profile/${userId}`}
                          >
                            <span>Usuário</span>
                          </Link>
                        ) : (
                          <Link className="tm-nav-link" to="/profile">
                            <span>Usuário</span>
                          </Link>
                        )}
                      </li>

                      <li className="tm-nav-li">
                        <Link className="tm-nav-link" to="/novorest">
                          <span>Restaurante</span>
                        </Link>
                      </li>

                      {/* <li className="tm-nav-li">
                        <Link className="tm-nav-link" to="/register">
                          {isLoggedIn ? <FaUserEdit /> : <FaUserPlus />}
                        </Link>
                      </li> */}

                      <li className="tm-nav-li">
                        {isLoggedIn ? (
                          <Link
                            className="tm-nav-link"
                            onClick={handleLogout}
                            to="/logout"
                          >
                            <span>Logout</span>
                          </Link>
                        ) : (
                          <Link className="tm-nav-link" to="/login">
                            <span>Login</span>
                          </Link>
                        )}
                      </li>

                      <li className="tm-nav-li uname">
                        {isLoggedIn && (
                          <UserStatus>
                            {name} {surname}
                            <div />
                          </UserStatus>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="js/jquery.min.js" />
        <script src="js/parallax.min.js" />
        <script src="js/intro.js" />
      </body>
    </Main>
  );
}
