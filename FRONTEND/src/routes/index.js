/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MySessionRoutes from './MySessionRoutes';
import Home from '../pages/Home';
import Restaurante from '../pages/Restaurante';
import Avaliacao from '../pages/Avaliacao';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import UserRegister from '../pages/UserRegister';
import ProfileRegister from '../pages/ProfileRegister';
import Page404 from '../pages/Page404';

export default function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MySessionRoutes>
            <Home />
          </MySessionRoutes>
        }
      />

      <Route
        path="/restaurante/:id"
        element={
          <MySessionRoutes>
            <Restaurante />
          </MySessionRoutes>
        }
      />

      <Route
        path="/avaliacao/:id"
        element={
          <MySessionRoutes>
            <Avaliacao />
          </MySessionRoutes>
        }
      />

      <Route
        path="/profile/"
        element={
          <MySessionRoutes isClosed>
            <ProfileRegister />
          </MySessionRoutes>
        }
      />

      <Route
        path="/profile/:id"
        element={
          <MySessionRoutes isClosed>
            <ProfileRegister />
          </MySessionRoutes>
        }
      />

      <Route
        path="/profile/:id/edit"
        element={
          <MySessionRoutes isClosed>
            <ProfileRegister />
          </MySessionRoutes>
        }
      />

      <Route
        path="/profile/:id/delete"
        element={
          <MySessionRoutes isClosed>
            <ProfileRegister />
          </MySessionRoutes>
        }
      />

      <Route
        path="/profile/:id/view"
        element={
          <MySessionRoutes isClosed>
            <Profile />
          </MySessionRoutes>
        }
      />

      <Route
        path="/login"
        element={
          <MySessionRoutes>
            <Login />
          </MySessionRoutes>
        }
      />

      <Route
        path="/register"
        element={
          <MySessionRoutes>
            <UserRegister />
          </MySessionRoutes>
        }
      />

      <Route
        path="*"
        element={
          <MySessionRoutes>
            <Page404 />
          </MySessionRoutes>
        }
      />
    </Routes>
  );
}
