import * as Yup from 'yup';

import ServiceOrderItem from '../models/ServiceOrderItem';
import ServiceOrder from '../models/ServiceOrder';

class ServiceOrderItemController {
  async index(req, res) {
    const { service_order_id } = req.params;

    const serviceOrderItems = await ServiceOrderItem.findAll({
      where: { service_order_id },
    });

    return res.json(serviceOrderItems);
  }

  async store(req, res) {
    const { service_order_id } = req.params;

    const serviceOrder = await ServiceOrder.findByPk(service_order_id);

    if (!serviceOrder) {
      return res.status(400).json({
        error: 'Ordem de serviço não encontrada.',
      });
    }

    const schema = Yup.object().shape({
      amount: Yup.number().min(1).required(),
      description: Yup.string().required(),
      value: Yup.number().min(1).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const serviceOrderItem = await ServiceOrderItem.create({
      service_order_id,
      ...req.body,
    });

    const totalItemValue =
      parseFloat(serviceOrderItem.toJSON().amount) *
      parseFloat(serviceOrderItem.toJSON().value);

    /**
     * Atualiza o valor total da ordem de serviço
     */

    await serviceOrder.update({
      total_value:
        parseFloat(serviceOrder.toJSON().total_value) + totalItemValue,
    });

    return res.json(serviceOrderItem);
  }
}

export default new ServiceOrderItemController();
