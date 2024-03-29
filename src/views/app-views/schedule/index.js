import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Pages = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/demo`}
        component={lazy(() => import(`./demo`))}
      />{" "}
      <Redirect from={`${match.url}`} to={`${match.url}/demo`} />
    </Switch>
  </Suspense>
);

export default Pages;
