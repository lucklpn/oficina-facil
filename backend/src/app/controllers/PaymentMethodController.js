import PaymentMethod from '../models/PaymentMethod';

class PaymentMethodController {
  async index(req, res) {
    const paymentMethods = await PaymentMethod.findAll();

    return res.json(paymentMethods);
  }
}

export default new PaymentMethodController();
