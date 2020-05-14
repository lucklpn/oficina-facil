import Sequelize, { Model } from 'sequelize';

class ServiceOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: Sequelize.INTEGER,
        customer_car_id: Sequelize.INTEGER,
        date: Sequelize.STRING,
        total_value: Sequelize.DECIMAL,
        paid_out: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
    });

    this.belongsTo(models.CustomerCar, {
      foreignKey: 'customer_car_id',
      as: 'customer_car',
    });

    this.hasMany(models.ServiceOrderItem, {
      foreignKey: 'service_order_id',
      as: 'items',
    });

    this.hasMany(models.ServiceOrderPayment, {
      foreignKey: 'service_order_id',
      as: 'payments',
    });
  }
}

export default ServiceOrder;
