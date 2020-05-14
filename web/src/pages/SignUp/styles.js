import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.div`
  position: relative;
  width: 90%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 30px;

  img {
    max-width: 100%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
      background: ${colors.green.main};

      &:hover {
        background: ${colors.green.lighten} !important;
      }
    }

    a {
      color: ${colors.primary.main};
      font-weight: bold;
      margin-top: 10px;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;

  input {
    width: 100%;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & + div {
    margin-top: 15px;
  }

  label {
    margin-bottom: 5px;
  }
`;
