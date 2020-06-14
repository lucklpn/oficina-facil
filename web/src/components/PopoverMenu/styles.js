import styled from 'styled-components';

import colors from '~/utils/colors';

export const MenuList = styled.ul`
  li {
    padding: 0 15px;
    transition: background 150ms;

    &:hover {
      background: #eee;
    }

    button {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      background: transparent;
      color: ${colors.text};
      font-size: 14px;
      font-weight: normal;
      text-transform: capitalize;
      padding: 0;

      a {
        color: ${colors.text};
      }

      &:hover {
        background: transparent !important;
      }

      svg {
        margin-right: 15px;
      }
    }
  }
`;

export const MenuButton = styled.button`
  background: transparent;

  &:hover {
    background: transparent !important;
  }
`;
