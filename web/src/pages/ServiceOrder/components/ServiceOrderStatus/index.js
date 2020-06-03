import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ServiceOrderStatus({ paidOut }) {
  return (
    <Container paidOut={paidOut}>
      <span>{paidOut ? 'PAGO' : 'EM ABERTO'}</span>
    </Container>
  );
}

ServiceOrderStatus.propTypes = {
  paidOut: PropTypes.bool.isRequired,
};
