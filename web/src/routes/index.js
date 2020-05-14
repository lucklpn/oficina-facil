import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import ServiceOrder from '~/pages/ServiceOrder';
import NewServiceOrder from '~/pages/ServiceOrder/New';
import Customer from '~/pages/Customer';
import NewCustomer from '~/pages/Customer/New';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route exact path="/orders" component={ServiceOrder} isPrivate />
      <Route path="/orders/new" component={NewServiceOrder} isPrivate />
      <Route path="/orders/:id" component={NewServiceOrder} isPrivate />

      <Route exact path="/customers" component={Customer} isPrivate />
      <Route path="/customers/new" component={NewCustomer} isPrivate />
      <Route path="/customers/:id" component={NewCustomer} isPrivate />
    </Switch>
  );
}
