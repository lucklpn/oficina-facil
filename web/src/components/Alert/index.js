import React from 'react';
import PropTypes from 'prop-types';

import { Container, CancelButton, ConfirmButton } from './styles';

export default function Alert({
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  function handleCancel() {
    onClose();

    if (onCancel) {
      onCancel();
    }
  }

  function handleConfirm() {
    onClose();
    onConfirm();
  }

  return (
    <Container>
      <header>
        <h3>{title}</h3>
      </header>

      <section>
        <span>{message}</span>

        <div>
          <CancelButton onClick={handleCancel}>NÃO</CancelButton>
          <ConfirmButton onClick={handleConfirm}>SIM</ConfirmButton>
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
  onCancel: PropTypes.func,
};

Alert.defaultProps = {
  onCancel: undefined,
};
