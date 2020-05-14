import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.div`
  position: relative;
  width: 350px;

  &:focus-within {
    svg {
      color: ${colors.primary.main} !important;
    }
  }

  svg {
    position: absolute;
    top: calc(50% - 12.5px);
    left: 10px;
  }

  input {
    width: 100%;
    padding: 0 20px 0 45px;
  }
`;
