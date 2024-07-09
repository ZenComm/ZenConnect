import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './Routes';
import Login from './Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
        <Route path="/" exact component={Login} /> {/* Add this line */}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;