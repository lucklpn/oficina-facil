import Sequelize, { Model } from 'sequelize';

import removeSpecialCharacter from '../../utils/removeSpecialCharacter';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
        address_number: Sequelize.STRING,
        district: Sequelize.STRING,
        address_complement: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', (customer) => {
      if (customer.cpf) {
        customer.cpf = removeSpecialCharacter(customer.cpf);
      }

      if (customer.phone) {
        customer.phone = removeSpecialCharacter(customer.phone);
      }

      if (customer.zip_code) {
        customer.zip_code = removeSpecialCharacter(customer.zip_code);
      }
    });
  }

  static associate(models) {
    this.hasMany(models.CustomerCar, {
      foreignKey: 'customer_id',
      as: 'cars',
    });

    this.hasMany(models.ServiceOrder, {
      foreignKey: 'customer_id',
      as: 'customer',
    });
  }
}

export default Customer;
