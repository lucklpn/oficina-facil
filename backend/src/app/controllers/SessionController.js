import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Por favor informe os dados corretamente.',
      });
    }

    const { login, password } = req.body;

    const user = await User.findOne({ where: { login } });

    const passwordMatch = user && (await user.checkPassword(password));

    if (!user || !passwordMatch) {
      return res.status(400).json({
        error:
          'Erro ao iniciar sessão, por favor verifique os dados informados.',
      });
    }

    const { id, name } = user;

    return res.json({
      user: { id, name, login },
      token: jwt.sign({ id }, authConfig.secretKey, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
