import Sequelize, { Model } from 'sequelize';

class ServiceOrderItem extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        description: Sequelize.STRING,
        value: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.ServiceOrder, {
      foreignKey: 'service_order_id',
      as: 'service_order',
    });
  }
}

export default ServiceOrderItem;
