import React from 'react';
import {
  Route
} from 'react-router-dom';
import { IRoute } from '../types/IRoute';

const RouteWithSubRoutes = (route: IRoute, index: number) => {
  return (
    <Route
      key={index}
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export {
  RouteWithSubRoutes
}
