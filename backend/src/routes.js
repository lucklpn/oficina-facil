import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CustomerController from './app/controllers/CustomerController';
import CustomerCarController from './app/controllers/CustomerCarController';
import PaymentMethodController from './app/controllers/PaymentMethodController';
import ServiceOrderController from './app/controllers/ServiceOrderController';
import ServiceOrderItemController from './app/controllers/ServiceOrderItemController';
import ServiceOrderPaymentController from './app/controllers/ServiceOrderPaymentController';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.show);
routes.get('/customers/:customer_id/cars', CustomerCarController.index);
routes.get('/payment_methods', PaymentMethodController.index);
routes.get('/service_orders', ServiceOrderController.index);
routes.get('/service_orders/:id', ServiceOrderController.show);
routes.get(
  '/service_orders/:service_order_id/items',
  ServiceOrderItemController.index
);
routes.get(
  '/service_orders/:service_order_id/payments',
  ServiceOrderPaymentController.index
);
routes.get(
  '/customers/:customer_id/service_orders',
  ServiceOrderController.index
);

routes.post('/customers', CustomerController.store);
routes.post('/customers/:customer_id/cars', CustomerCarController.store);
routes.post('/service_orders', ServiceOrderController.store);
routes.post(
  '/service_orders/:service_order_id/items',
  ServiceOrderItemController.store
);
routes.post(
  '/service_orders/:service_order_id/payments',
  ServiceOrderPaymentController.store
);

routes.put('/customers/:id', CustomerController.update);
routes.put('/customers/:customer_id/cars/:id', CustomerCarController.update);

routes.delete('/customers/:id', CustomerController.delete);
routes.delete('/customers/:customer_id/cars/:id', CustomerCarController.delete);
routes.delete('/service_orders/:id', ServiceOrderController.delete);
routes.delete(
  '/service_orders/:service_order_id/payments/:id',
  ServiceOrderPaymentController.delete
);

export default routes;
