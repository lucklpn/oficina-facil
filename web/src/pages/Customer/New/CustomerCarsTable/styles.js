import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  overflow: auto;

  table {
    th#modelColumn {
      width: 35%;
      min-width: 250px;
    }

    th#manufactureYearColumn {
      width: 15%;
      min-width: 140px;
    }

    th#manufacturerColumn {
      width: 30%;
      min-width: 170px;
    }

    th#licensePlateColumn {
      width: 15%;
      min-width: 140px;
    }

    th#menuColumn {
      width: 30px !important;
    }
  }
`;
