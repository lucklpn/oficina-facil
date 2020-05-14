import Sequelize, { Model } from 'sequelize';

class PaymentMethod extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.ServiceOrderPayment, {
      foreignKey: 'payment_method_id',
      as: 'payment_method',
    });
  }
}

export default PaymentMethod;
