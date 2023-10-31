import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUserEdit,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav, UserStatus } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.user.nome);

  const userId = 1;

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());

    history.push('/');
  };

  return (
    <Nav>
      <Link to="/profile">
        <span>Sign Up</span>
      </Link>

      <Link to={`/profile/${userId}`}>
        <span>Editar Conta</span>
      </Link>

      <Link to="/">
        <span>Home</span>
      </Link>

      <Link to="/novorest">
        <span>Novo Restaurante</span>
      </Link>

      <Link to="/register">{isLoggedIn ? <FaUserEdit /> : <FaUserPlus />}</Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaSignOutAlt />
        </Link>
      ) : (
        <Link to="/login">
          <FaUser />
        </Link>
      )}

      {isLoggedIn && (
        <UserStatus>
          {name}
          <div />
        </UserStatus>
      )}
    </Nav>
  );
}
