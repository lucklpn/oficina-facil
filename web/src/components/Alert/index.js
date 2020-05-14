import React from 'react';
import PropTypes from 'prop-types';

import { Container, CancelButton, ConfirmButton } from './styles';

export default function Alert({ onClose, title, message, onConfirm }) {
  return (
    <Container>
      <header>
        <h3>{title}</h3>
      </header>

      <section>
        <span>{message}</span>

        <div>
          <CancelButton onClick={onClose}>NÃO</CancelButton>
          <ConfirmButton onClick={() => onConfirm(onClose)}>SIM</ConfirmButton>
        </div>
      </section>
    </Container>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
