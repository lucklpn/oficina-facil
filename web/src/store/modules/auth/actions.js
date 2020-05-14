export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user, token },
  };
}

export function signUpRequest(name, email, user_password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, user_password },
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
