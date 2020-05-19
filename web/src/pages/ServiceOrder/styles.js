import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  & > section {
    background: #f2f2f2;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 8px 8px 3px -1px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin-top: 30px;

    .add-service-order-section {
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
        th#customerColumn {
          width: 30%;
          min-width: 300px;
        }

        th#customerCarColumn {
          width: 25%;
          min-width: 200px;
        }

        th#dateColumn,
        th#valueColumn,
        th#statusColumn {
          width: 15%;
          min-width: 120px;
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

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 15px 0;

  @media screen and (max-width: 767px) {
    width: 100% !important;
  }

  label {
    margin-bottom: 10px;

    span {
      color: #999;
      font-size: 10px;
      font-weight: normal;
      margin-left: 2px;
    }
  }

  input {
    width: 100%;
  }
`;
