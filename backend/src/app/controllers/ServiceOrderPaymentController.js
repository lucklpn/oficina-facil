import * as Yup from 'yup';

import ServiceOrderPayment from '../models/ServiceOrderPayment';
import ServiceOrder from '../models/ServiceOrder';
import PaymentMethod from '../models/PaymentMethod';

class ServiceOrderPaymentController {
  async index(req, res) {
    const { service_order_id } = req.params;

    const serviceOrderPayments = await ServiceOrderPayment.findAll({
      where: { service_order_id },
      include: [
        {
          model: PaymentMethod,
          as: 'payment_method',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      ],
    });

    return res.json(serviceOrderPayments);
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
      date: Yup.date().required(),
      value: Yup.number().min(1).required(),
      payment_method_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    if (serviceOrder.paid_out) {
      return res.status(400).json({
        error: 'Ordem de serviço já paga.',
      });
    }

    const paymentMethod = await PaymentMethod.findByPk(
      req.body.payment_method_id
    );

    if (!paymentMethod) {
      return res.status(400).json({
        error: 'Forma de pagamento não encontrada.',
      });
    }

    const serviceOrderPayments = await ServiceOrderPayment.findAll({
      where: { service_order_id },
    });

    let paidValue = serviceOrderPayments.reduce((value, payment) => {
      return value + parseFloat(payment.value);
    }, 0);

    /**
     * Verifica se o pagamento não excede o valor total da ordem de serviço
     */

    if (
      paidValue + parseFloat(req.body.value) >
      parseFloat(serviceOrder.total_value)
    ) {
      return res.status(400).json({
        error: 'Valor de pagamento excede valor total da ordem de serviço.',
      });
    }

    const serviceOrderPayment = await ServiceOrderPayment.create({
      service_order_id,
      ...req.body,
    });

    paidValue += parseFloat(serviceOrderPayment.value);

    /**
     * Verifica se a ordem de serviço foi completamente paga, e marca o campo
     * "paid_out" como "true"
     */
    if (paidValue === parseFloat(serviceOrder.total_value)) {
      await serviceOrder.update({ paid_out: true });
    }

    return res.json(serviceOrderPayment);
  }

  async delete(req, res) {
    const { service_order_id, id } = req.params;

    const serviceOrder = await ServiceOrder.findByPk(service_order_id);

    if (!serviceOrder) {
      return res
        .status(400)
        .json({ error: 'Ordem de serviço não encontrada.' });
    }

    const serviceOrderPayment = await ServiceOrderPayment.findByPk(id);

    if (!serviceOrderPayment) {
      return res.status(400).json({ error: 'Pagamento não encontrado.' });
    }

    await serviceOrderPayment.destroy();

    if (serviceOrder.paid_out) {
      await serviceOrder.update({ paid_out: false });
    }

    return res.json();
  }
}

export default new ServiceOrderPaymentController();
