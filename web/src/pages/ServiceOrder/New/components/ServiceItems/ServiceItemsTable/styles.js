import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  overflow: auto;

  table {
    th#amountColumn {
      width: 15%;
      min-width: 14px;
    }

    th#descriptionColumn {
      width: 55%;
      min-width: 390px;
    }

    th#unityValueColumn,
    th#totalValueColumn {
      width: 15%;
      min-width: 150px;
    }

    th#menuColumn {
      width: 30px !important;
    }
  }
`;
