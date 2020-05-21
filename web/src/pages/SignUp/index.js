import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import { Container, Content, FormGroup } from './styles';

import Logo from '~/assets/logo.png';

export default function SignUp() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('* Campo obrigatório'),
    login: Yup.string().required('* Campo obrigatório'),
    user_password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('* Campo obrigatório'),
  });

  async function handleSubmit({ name, login, user_password }) {
    dispatch(signUpRequest(name, login, user_password));
  }

  return (
    <Container>
      <img src={Logo} alt="Logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Content>
          <FormGroup>
            <label htmlFor="name">Nome</label>
            <Input id="name" name="name" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="login">Login</label>
            <Input id="login" name="login" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="user_password">Senha</label>
            <Input type="password" id="user_password" name="user_password" />
          </FormGroup>
        </Content>

        <button type="submit" disabled={loading}>
          {loading ? 'SALVANDO...' : 'CRIAR CONTA'}
        </button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </Container>
  );
}
