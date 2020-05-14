import Sequelize, { Model } from 'sequelize';

class CustomerCar extends Model {
  static init(sequelize) {
    super.init(
      {
        model: Sequelize.STRING,
        manufacture_year: Sequelize.INTEGER,
        manufacturer: Sequelize.STRING,
        license_plate: Sequelize.STRING,
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

    this.hasMany(models.ServiceOrder, {
      foreignKey: 'customer_car_id',
      as: 'customer_car',
    });
  }
}

export default CustomerCar;
