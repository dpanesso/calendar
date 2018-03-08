import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      loggedIn === true
      ? <Component {...props} {...rest} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )}
  />
);

export default PrivateRoute;
