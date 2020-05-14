import * as Yup from 'yup';

import CustomerCar from '../models/CustomerCar';
import Customer from '../models/Customer';

class CustomerCarController {
  async index(req, res) {
    const customer = await Customer.findByPk(req.params.customer_id, {
      where: { deleted_at: null },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    const { count, rows: customerCars } = await CustomerCar.findAndCountAll({
      where: {
        customer_id: req.params.customer_id,
        deleted_at: null,
      },
      order: ['created_at'],
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', count);

    return res.json(customerCars);
  }

  async show(req, res) {
    const { customer_id, id } = req.params;

    const customer = await Customer.findByPk(customer_id, {
      where: { deleted_at: null },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    const customerCar = await CustomerCar.findByPk(id, {
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(customerCar || {});
  }

  async store(req, res) {
    const { customer_id } = req.params;

    const customer = await Customer.findByPk(customer_id, {
      where: { deleted_at: null },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    const schema = Yup.object().shape({
      model: Yup.string().required(),
      manufacture_year: Yup.number().required(),
      manufacturer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const customerCarExists = await CustomerCar.findOne({
      where: {
        customer_id,
        license_plate: req.body.license_plate,
        deleted_at: null,
      },
    });

    if (customerCarExists) {
      return res.status(400).json({
        error:
          'Já existe um automóvel com essa placa, cadastrado para o cliente.',
      });
    }

    const customerCar = await CustomerCar.create({
      customer_id,
      ...req.body,
    });

    return res.json(customerCar);
  }

  async update(req, res) {
    const { customer_id, id } = req.params;

    const customer = await Customer.findByPk(customer_id, {
      where: { deleted_at: null },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    let customerCar = await CustomerCar.findByPk(id, {
      where: { deleted_at: null },
    });

    if (!customerCar) {
      return res.status(400).json({ error: 'Automóvel não encontrado.' });
    }

    const schema = Yup.object().shape({
      model: Yup.string().required(),
      manufacture_year: Yup.number().required(),
      manufacturer: Yup.string().required(),
      license_plate: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const customerCarExists = await CustomerCar.findOne({
      where: {
        customer_id,
        license_plate: req.body.license_plate,
        deleted_at: null,
      },
    });

    if (customerCarExists && customerCarExists.id !== Number(id)) {
      return res.status(400).json({
        error:
          'Já existe um automóvel com essa placa, cadastrado para o cliente.',
      });
    }

    customerCar = await customerCar.update(req.body);

    return res.json(customerCar);
  }

  async delete(req, res) {
    const { customer_id, id } = req.params;

    const customer = await Customer.findByPk(customer_id, {
      where: { deleted_at: null },
    });

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    const customerCar = await CustomerCar.findByPk(id, {
      where: { deleted_at: null },
    });

    if (!customerCar) {
      return res.status(400).json({ error: 'Automóvel não encontrado.' });
    }

    await customerCar.update({ deleted_at: new Date() });

    return res.json();
  }
}

export default new CustomerCarController();
