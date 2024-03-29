import styled from 'styled-components';

import colors from '~/utils/colors';

export const Wrapper = styled.section`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  form {
    > button {
      width: 200px;
      margin: 0 auto;
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
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 8px 8px 3px -1px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 30px 0;

  header {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;

    &::after {
      content: '';
      height: 2px;
      display: flex;
      flex: 1;
      background: ${colors.primary.main};
      margin-left: 30px;
    }

    h2 {
      color: ${colors.primary.main};
    }
  }
`;
