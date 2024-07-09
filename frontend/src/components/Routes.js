import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
      path: '/profile',
      component: Profile,
      exact: true,
    },
];

export default routes;