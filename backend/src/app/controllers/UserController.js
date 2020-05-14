import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      login: Yup.string().required(),
      user_password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const loginExists = await User.findOne({
      where: { login: req.body.login },
    });

    if (loginExists) {
      return res.status(400).json({ error: 'Email informado já está em uso.' });
    }

    const { id, name, login, created_at, updated_at } = await User.create(
      req.body
    );

    return res.json({ id, name, login, created_at, updated_at });
  }
}

export default new UserController();
