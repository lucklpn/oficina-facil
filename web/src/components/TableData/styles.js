import styled from 'styled-components';

import colors from '~/utils/colors';

export const Container = styled.table`
  width: 100%;
  font-size: 15px;
  border-spacing: 0;
  text-align: left;

  thead {
    th#idColumn {
      width: 100px;
      text-align: center;
    }

    th#menuColumn {
      width: 75px;
    }
  }

  th {
    border-bottom: 3px solid ${colors.primary.main};
    color: ${colors.primary.main};
    padding: 10px 15px;
  }

  tbody > tr {
    height: 55px;
    background: #fff;

    &:not(:last-child) {
      td {
        border-bottom: 1px solid #ddd;
      }
    }
  }

  td {
    color: ${colors.text};
    padding: 10px 15px;
  }
`;
