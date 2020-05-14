import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  & > section {
    background: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin-top: 30px;

    .add-customer-section {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;

      &::before {
        content: '';
        height: 2px;
        display: flex;
        flex: 1;
        background: ${colors.primary.main};
        margin-right: 30px;
      }
    }

    .content-section {
      overflow: auto;

      table {
        th#idColumn {
          width: 75px;
          text-align: center;
        }

        th#nameColumn {
          min-width: 300px;
        }

        th#phoneColumn {
          min-width: 180px;
        }

        td:first-child {
          text-align: center;
        }
      }
    }
  }
`;

export const Header = styled.header`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media screen and (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }

  h1 {
    min-width: max-content;
    margin-right: 30px;

    @media screen and (max-width: 576px) {
      margin: 0px 0px 20px;
    }
  }

  div {
    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
`;
