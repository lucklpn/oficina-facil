import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  justify-content: center;
  border-radius: 10px;

  > header {
    background: ${colors.primary.main};
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    padding: 15px 20px;

    h3 {
      color: ${colors.title};
      font-size: 18px;
    }
  }

  footer {
    padding: 10px 30px;
    margin: 30px 0 0 auto;

    button {
      width: 100px !important;
      background: ${colors.green.main};

      &:hover {
        background: ${colors.green.lighten} !important;
      }
    }
  }
`;

export const Content = styled.section`
  width: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  overflow-y: scroll;
`;

export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & + section {
    margin-top: 20px;
  }

  &.service-order-financial {
    div {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    span {
      margin: 5px 0;

      &.totalValue,
      &.paidValue {
        width: 50%;
      }
    }
  }

  &.service-order-items {
    span {
      &.itemAmount,
      &.itemDescription {
        width: 100%;
      }

      &.itemValue,
      &.itemTotalValue {
        width: 50%;
      }
    }
  }

  &.service-order-payments {
    span {
      &.paymentDate,
      &.paymentValue {
        width: 50%;
      }

      &.paymentMethod {
        width: 100%;
      }
    }
  }

  header {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;

    &::after {
      content: '';
      height: 2px;
      display: flex;
      flex: 1;
      background: ${colors.primary.main};
      margin-left: 15px;
    }

    h4 {
      color: ${colors.primary.main};
      text-transform: uppercase;
    }
  }

  ul {
    li {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 3px 0;

      & + li {
        border-top: 1px solid #ddd;
      }

      span {
        margin: 5px 0;
      }
    }
  }
`;
