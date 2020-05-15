import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;

    const response = yield call(api.post, 'sessions', {
      login,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(user, token));
    history.push('/orders');
  } catch (err) {
    toast.error('Falha na autenticação, por favor verifique os dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, login, user_password } = payload;

    yield call(api.post, 'users', {
      name,
      login,
      user_password,
    });

    toast.success('Usuário cadastrado com sucesso.');

    setTimeout(() => {
      history.push('/');
    }, 3000);
  } catch (err) {
    toast.error('Falha no cadastro, por favor verifique os dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
