import * as Yup from 'yup';
import { Op } from 'sequelize';

import ServiceOrder from '../models/ServiceOrder';
import Customer from '../models/Customer';
import CustomerCar from '../models/CustomerCar';
import ServiceOrderItem from '../models/ServiceOrderItem';
import ServiceOrderPayment from '../models/ServiceOrderPayment';
import PaymentMethod from '../models/PaymentMethod';

class ServiceOrderController {
  async index(req, res) {
    const { customer_id } = req.params;
    const { page = 1, query = '' } = req.query;

    const { count, rows: serviceOrders } = await ServiceOrder.findAndCountAll({
      where: customer_id
        ? { customer_id, deleted_at: null }
        : { deleted_at: null },
      limit: 10,
      offset: (page - 1) * 10,
      order: [['updated_at', 'DESC']],
      include: [
        {
          model: Customer,
          as: 'customer',
          where: customer_id
            ? { deleted_at: null }
            : {
                name: { [Op.iLike]: `%${query}%` },
                deleted_at: null,
              },
          attributes: ['id', 'name'],
        },
        {
          model: CustomerCar,
          as: 'customer_car',
          attributes: ['id', 'model', 'license_plate'],
        },
        {
          model: ServiceOrderItem,
          as: 'items',
          attributes: {
            exclude: ['service_order_id', 'created_at', 'updated_at'],
          },
        },
        {
          model: ServiceOrderPayment,
          as: 'payments',
          attributes: {
            exclude: ['service_order_id', 'created_at', 'updated_at'],
          },
          include: [
            {
              model: PaymentMethod,
              as: 'payment_method',
              attributes: { exclude: ['created_at', 'updated_at'] },
            },
          ],
        },
      ],
    });

    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', count);

    return res.json(serviceOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      customer_id: Yup.number().required(),
      customer_car_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const customer = await Customer.findByPk(req.body.customer_id, {
      where: { deleted_at: null },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    const customerCar = await CustomerCar.findByPk(req.body.customer_car_id, {
      where: { deleted_at: null },
    });

    if (!customerCar) {
      return res.status(400).json({ error: 'Automóvel não encontrado.' });
    }

    const serviceOrder = await ServiceOrder.create(req.body);

    return res.json(serviceOrder);
  }

  async delete(req, res) {
    const serviceOrder = await ServiceOrder.findByPk(req.params.id);

    if (!serviceOrder) {
      return res
        .status(400)
        .json({ error: 'Ordem de serviço não encontrada.' });
    }

    await serviceOrder.update({ deleted_at: new Date() });

    return res.json();
  }
}

export default new ServiceOrderController();
