import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.section`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export const PaginationButton = styled.button`
  width: 120px;
  background: ${colors.blue.main};

  &:not([disabled]):hover {
    background: ${colors.blue.lighten} !important;
  }
`;
