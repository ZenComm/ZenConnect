import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import EmployeeView from './EmployeeView';
import Dashboard from './Dashboard';
import Admin from './Admin';

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
    {
          path: '/EmployeeView',
          component: EmployeeView,
          exact: true,
    },
    {
            path: '/Dashboard',
            component: Dashboard,
            exact: true,
    },
    {
            path: '/Dashboard',
            component: Dashboard,
            exact: true,
    },
    {
            path: '/Admin',
            component: Admin,
            exact: true,
    },
];

export default routes;