import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import ServiceOrder from '~/pages/ServiceOrder';
import NewServiceOrder from '~/pages/ServiceOrder/New';
import ServiceOrderPrinting from '~/pages/ServiceOrder/Print';
import Customer from '~/pages/Customer';
import NewCustomer from '~/pages/Customer/New';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />

      <Route exact path="/orders" component={ServiceOrder} isPrivate />
      <Route exact path="/orders/new" component={NewServiceOrder} isPrivate />
      <Route
        exact
        path="/orders/print"
        component={ServiceOrderPrinting}
        isPrivate
        isPrint
      />

      <Route exact path="/customers" component={Customer} isPrivate />
      <Route exact path="/customers/new" component={NewCustomer} isPrivate />
      <Route exact path="/customers/:id" component={NewCustomer} isPrivate />
    </Switch>
  );
}
