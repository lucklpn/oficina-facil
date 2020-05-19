import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import { IoIosClose } from 'react-icons/io';

import { Wrapper, Container, Header } from './styles';

export default function Modal({
  children,
  isOpen,
  title,
  initialData,
  schemaValidator,
  onClose,
  onSubmit,
  ...rest
}) {
  return (
    <>
      {isOpen && (
        <Wrapper>
          <Container {...rest}>
            <Header>
              <h2>{title}</h2>

              <button type="button" onClick={onClose}>
                <IoIosClose size={38} color="#fff" />
              </button>
            </Header>

            <Form
              initialData={initialData}
              schema={schemaValidator}
              onSubmit={onSubmit}
            >
              {children}

              <button type="submit">SALVAR</button>
            </Form>
          </Container>
        </Wrapper>
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  initialData: PropTypes.shape(),
  schemaValidator: PropTypes.shape(),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: null,
  title: '',
  initialData: {},
  schemaValidator: {},
};
