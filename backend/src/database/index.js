import Sequelize from 'sequelize';

import User from '../app/models/User';
import Customer from '../app/models/Customer';
import CustomerCar from '../app/models/CustomerCar';
import PaymentMethod from '../app/models/PaymentMethod';
import ServiceOrder from '../app/models/ServiceOrder';
import ServiceOrderItem from '../app/models/ServiceOrderItem';
import ServiceOrderPayment from '../app/models/ServiceOrderPayment';

import databaseConfig from '../config/database';

const models = [
  User,
  Customer,
  CustomerCar,
  PaymentMethod,
  ServiceOrder,
  ServiceOrderItem,
  ServiceOrderPayment,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));

    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
