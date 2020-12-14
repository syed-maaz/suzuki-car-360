/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g:  `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import HomePageComponent from "./components/home";

export function Routes() {
  /*
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );
*/
  return (
    <Switch>
      <Route path="/:carName?" component={HomePageComponent} exact />
      {/* <Route path="/interior" component={About} /> */}
    </Switch>
  );
}
