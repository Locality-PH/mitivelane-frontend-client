import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        {/* <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./dashboards`))}
        /> */}
        <Route
          path={`${APP_PREFIX_PATH}/feeds`}
          component={lazy(() => import(`./home`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/group/:name`}
          component={lazy(() => import(`./organization`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/apps`}
          component={lazy(() => import(`./apps`))}
        />
        {/* <Route
          path={`${APP_PREFIX_PATH}/settings`}
          component={lazy(() => import(`./pages/setting`))}
        /> */}
        <Route
          path={`${APP_PREFIX_PATH}/account`}
          component={lazy(() => import(`./account`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/schedule`}
          component={lazy(() => import(`./schedule`))}
        />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/feeds`} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
