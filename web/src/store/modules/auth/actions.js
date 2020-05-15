export function signInRequest(login, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { login, password },
  };
}

export function signInSuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user, token },
  };
}

export function signUpRequest(name, login, user_password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, login, user_password },
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
