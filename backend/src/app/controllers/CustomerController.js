import * as Yup from 'yup';
import { Op } from 'sequelize';
import validarCpf from 'validar-cpf';

import Customer from '../models/Customer';

import removeSpecialCharacter from '../../utils/removeSpecialCharacter';

class CustomerController {
  async index(req, res) {
    const { page = 1, query = '' } = req.query;

    const { count, rows: customers } = await Customer.findAndCountAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
        deleted_at: null,
      },
      limit: 10,
      offset: (page - 1) * 10,
      order: [['updated_at', 'DESC']],
    });

    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', count);

    return res.json(customers);
  }

  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    return res.json(customer || {});
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      cpf: Yup.string().required(),
      phone: Yup.string(),
      address: Yup.string(),
      address_number: Yup.string(),
      district: Yup.string(),
      address_complement: Yup.string(),
      zip_code: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const cpfNumbers = removeSpecialCharacter(req.body.cpf);

    if (!validarCpf(cpfNumbers)) {
      return res.status(400).json({ error: 'CPF inválido.' });
    }

    const cpfExists = await Customer.findOne({
      where: { cpf: cpfNumbers },
    });

    if (cpfExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um cliente cadastrado com esse CPF.' });
    }

    const customer = await Customer.create(req.body);

    return res.json(customer);
  }

  async update(req, res) {
    let customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      phone: Yup.string(),
      address: Yup.string(),
      address_number: Yup.string(),
      district: Yup.string(),
      address_complement: Yup.string(),
      zip_code: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    customer = await customer.update(req.body);

    return res.json(customer);
  }

  async delete(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    await customer.update({ deleted_at: new Date() });

    return res.json();
  }
}

export default new CustomerController();
