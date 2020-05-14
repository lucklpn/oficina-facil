import Sequelize, { Model } from 'sequelize';

class ServiceOrderPayment extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_method_id: Sequelize.INTEGER,
        date: Sequelize.DATEONLY,
        value: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.PaymentMethod, {
      foreignKey: 'payment_method_id',
      as: 'payment_method',
    });

    this.belongsTo(models.ServiceOrder, {
      foreignKey: 'service_order_id',
      as: 'service_order',
    });
  }
}

export default ServiceOrderPayment;
