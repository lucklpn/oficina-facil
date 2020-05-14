import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  justify-content: center;
  border-radius: 10px;

  header {
    background: ${colors.primary.main};
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    padding: 15px 20px;

    h3 {
      color: ${colors.title};
      font-size: 18px;
    }
  }

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 30px;

    span {
      color: ${colors.text};
      font-size: 18px;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 30px 0 0 auto;
    }
  }
`;

export const CancelButton = styled.button.attrs({
  type: 'button',
})`
  width: 100px !important;
  margin-right: 15px;
`;

export const ConfirmButton = styled.button.attrs({
  type: 'button',
})`
  width: 100px !important;
  background: ${colors.green.main};

  &:hover {
    background: ${colors.green.lighten} !important;
  }
`;
