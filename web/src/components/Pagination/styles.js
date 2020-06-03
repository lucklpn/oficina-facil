import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.section`
  max-width: 300px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto 0;
`;

export const PaginationButton = styled.button`
  width: 120px;
  background: ${colors.blue.main};

  &:not([disabled]):hover {
    background: ${colors.blue.lighten} !important;
  }
`;
