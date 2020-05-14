import styled from 'styled-components';

import background from '~/assets/internal-background.png';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    transparent 300px,
    #e4e4e4 calc(100vh - 450px)
  );
  padding-bottom: 50px;
`;

export const Content = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: 30px auto 0;
`;

export const Background = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: url(${background}) no-repeat;
  background-size: cover;
  background-position-y: 90%;
  top: 0;
  left: 0;
  z-index: -1;
`;
