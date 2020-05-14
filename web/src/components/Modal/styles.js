import styled from 'styled-components';

import colors from '~/utils/colors';

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 1998;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90% !important;
  min-width: 300px;
  max-width: 550px;
  min-height: 300px;
  background: #f2f2f2;
  border-radius: 10px;
  z-index: 1999;

  form {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 15px 30px 30px;

    button {
      width: 150px;
      margin: 30px auto 0;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${colors.primary.main};
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  padding: 5px 30px;

  h2 {
    color: ${colors.title};
    font-size: 16px;
  }

  button {
    height: auto;
    border-radius: 50%;
    padding: 0;
    transform: translateX(10px);
  }
`;
