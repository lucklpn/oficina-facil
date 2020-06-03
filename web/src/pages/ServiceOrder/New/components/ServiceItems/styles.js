import styled from 'styled-components';

import colors from '~/utils/colors';

export const AddButton = styled.button.attrs({
  type: 'button',
})`
  width: 150px !important;
  background: transparent;
  color: ${colors.blue.main};
  font-size: 12px;
  margin: 30px 0 0 auto !important;
  transition: background 300ms, color 300ms;

  &:hover {
    background: ${colors.blue.lighten} !important;
    color: #fff;

    svg {
      color: #fff !important;
    }
  }

  svg {
    margin-right: 5px;
    transition: color 300ms;
  }
`;
