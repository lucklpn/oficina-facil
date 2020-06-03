import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.div`
  background: ${(props) =>
    props.paidOut ? colors.green.main : colors.yellow.main};
  border-radius: 30px;
  padding: 5px 15px;

  span {
    display: block;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`;
