import styled from 'styled-components';

import colors from '~/utils/colors';

export const Wrapper = styled.div`
  max-width: 500px;
  margin: 10px auto 10px 10px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  div.logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid #999;
    padding: 5px 10px;

    img {
      width: 30%;
      margin-right: 50px;
    }
  }

  div.service-order {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    margin-top: 5px;

    h1 {
      color: ${colors.label};
      font-size: 13px;
      font-weight: bold;
      margin: 0;
    }
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    color: ${colors.label};
    font-size: 14px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 2px;
  }

  span {
    color: ${colors.text};
    font-size: 13px;
    text-align: center;
    margin: 2px 0;
  }
`;

export const ServiceOrderInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;
    padding: 5px 10px;

    &.service-order-number {
      flex: 1;
    }

    &.service-order-date {
      width: 120px;
      margin-left: 5px;

      strong {
        font-size: 13px;
      }
    }
  }
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  border: 1px solid #999;
  padding: 5px 10px;
  margin-top: 5px;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    margin: 2px 0;

    > div {
      width: 50%;
      display: flex;
      flex-direction: row;
    }

    span {
      flex: 1;
    }

    strong {
      width: 70px;
      color: ${colors.label};
    }
  }
`;

export const Content = styled.section`
  width: 100%;
  margin-top: 5px;

  table {
    th.amountColumn {
      width: 15%;
    }

    th.descriptionColumn {
      width: 65%;
    }

    th.valueColumn {
      width: 20%;
    }

    th {
      border: 0.5px solid #999;
      border-top: 1px solid #999;
      color: ${colors.label};
      font-size: 12px;
      text-align: center;
      padding: 2px;

      &:first-child {
        border-left: 1px solid #999;
      }

      &:last-child {
        border-right: 1px solid #999;
      }
    }

    tbody {
      tr {
        &.totalRow {
          td {
            border-bottom: 1px solid #999;
            color: ${colors.label};
            font-weight: bold;
          }
        }

        td {
          height: 21px;
          border: 0.5px solid #999;
          font-size: 12px;
          text-align: center;
          padding: 3px;

          &:first-child {
            border-left: 1px solid #999;
          }

          &:last-child {
            border-right: 1px solid #999;
          }
        }
      }
    }
  }
`;

export const DateIssue = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid #999;
  font-size: 10px;
  padding: 2px 10px;
  margin-top: 5px;
`;
