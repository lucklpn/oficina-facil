import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import colors from '~/utils/colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  *[disabled] {
    background-color: ${colors.disabled} !important;
    cursor: not-allowed !important;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  label {
    font-weight: bold;
    color: ${colors.label};
  }

  input {
    height: 45px;
    color: ${colors.text};
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 10px;

    &::placeholder {
      color: #999;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:-webkit-autofill, input:-webkit-autofill:hover,
  input:-webkit-autofill:focus  {
    -webkit-text-fill-color: ${colors.text};
    box-shadow: 0 0 0 30px white inset !important;
  }

  input:not([type="submit"]):focus, textarea:focus {
    border-color: ${colors.primary.main};
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.primary.main};
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    transition: background 200ms;
    cursor: pointer;

    &[type="submit"] {
      background: ${colors.green.main};
    }

    &.cancel-button {
      width: 120px;
      background: ${colors.primary.lighten};

      a {
        color: #fff;
      }
    }

    &.new-button {
      width: 150px;

      a {
        color: #fff;
      }
    }

    &[disabled] {
      background: ${colors.disabled};
    }

    &:not([disabled]):hover {
      background: ${colors.primary.lighten};

      &[type="submit"] {
        background: ${colors.green.lighten};
      }
    }
  }

  h1, h2, h3 {
    color: ${colors.title};
    font-weight: bold;
    text-transform: uppercase;
  }

  h1 {
    font-size: 22px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  form {
    input + span {
      color: ${colors.primary.main};
      font-size: 13px;
      font-weight: bold;
      margin: 3px auto 0 0;
    }
  }

  /** Custom Scrollbar */
  #root *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  #root *::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 30px;
  }

  #root *::-webkit-scrollbar-thumb {
    background: ${colors.primary.main};
    border-radius: 30px;
  }

  /** Custom Toastify */
  .toast-container {
    border-radius: 5px;
    font-size: 16px;
    padding: 0 10px;
  }

  .toast-container.Toastify__toast--error {
    background: ${colors.primary.lighten};
  }

  .toast-container.Toastify__toast--success {
    background: ${colors.green.lighten};
  }

  .toast-container button[aria-label="close"] {
    opacity: 1;

    &:hover {
      background: transparent;
    }
  }

  .toast-progressbar {
    background: #fff;
  }

  /** Custom React Confirm Alert */
  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.7);
  }

  .react-confirm-alert {
    width: 90%;
    max-width: 450px;
  }

  /** Custom React Select disabled */
  .css-19pra7p-container .css-r7nncd-control {
    background: ${colors.disabled};
  }

  .css-19pra7p-container .css-1i75kto-indicatorContainer {
    color: ${colors.disabled} !important;
  }
`;
