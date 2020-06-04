import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Content, FormGroup } from './styles';

import Logo from '~/assets/logo.png';

export default function SignIn() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    login: Yup.string().required('* Campo obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('* Campo obrigatório'),
  });

  function handleSubmit({ login, password }) {
    dispatch(signInRequest(login, password));
  }

  return (
    <Container>
      <img src={Logo} alt="Logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Content>
          <FormGroup>
            <label htmlFor="login">Login</label>
            <Input id="login" name="login" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Senha</label>
            <Input type="password" id="password" name="password" />
          </FormGroup>
        </Content>

        <button type="submit" disabled={loading}>
          {loading ? 'ACESSANDO...' : 'LOGIN'}
        </button>
        <Link to="/register">Ainda não tenho uma conta</Link>
      </Form>
    </Container>
  );
}
