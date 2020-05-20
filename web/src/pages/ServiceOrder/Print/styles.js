import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  div.logo {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #999;
    padding: 10px;

    img {
      width: 70%;
    }
  }

  div.service-order {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    margin-left: 15px;

    h1 {
      color: #222;
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
  }
`;

export const CompanyInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;

  h3 {
    width: 100%;
    color: #222;
    font-size: 18px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 13px;
    margin: 5px 0;

    span {
      flex: 1;
    }

    strong {
      width: 70px;
      color: #222;
    }
  }
`;

export const ServiceOrderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #999;
    padding: 10px;

    &.service-order-number {
      flex: 1;
    }

    &.service-order-date {
      width: 15%;
      margin-left: 15px;
    }
  }
`;

export const CustomerInfo = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1.5px solid #999;
  padding: 10px;
  margin-top: 15px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    margin: 5px 0;

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
      color: #222;
    }
  }
`;

export const DateIssue = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1.5px solid #999;
  padding: 10px;
  margin-top: 15px;
`;

export const Content = styled.section`
  width: 100%;
  margin-top: 15px;

  table {
    width: 100%;

    th.amountColumn {
      width: 15%;
    }

    th.descriptionColumn {
      width: 70%;
    }

    th.valueColumn {
      width: 15%;
    }

    th {
      border: 0.75px solid #999;
      border-top: 1.5px solid #999;
      color: #222;
      font-size: 16px;
      text-align: center;
      padding: 10px 5px;

      &:first-child {
        border-left: 1.5px solid #999;
      }

      &:last-child {
        border-right: 1.5px solid #999;
      }
    }

    tbody {
      tr {
        &.totalRow {
          td {
            border-bottom: 1.5px solid #999;
            color: #222;
            font-size: 16px;
            font-weight: bold;
          }
        }

        td {
          border: 0.75px solid #999;
          text-align: center;
          padding: 10px 5px;

          &:first-child {
            border-left: 1.5px solid #999;
          }

          &:last-child {
            border-right: 1.5px solid #999;
          }
        }
      }
    }
  }
`;
